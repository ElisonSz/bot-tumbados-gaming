import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear una nueva instancia del cliente
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Colección para almacenar comandos
client.commands = new Collection();

// Función para cargar comandos
async function loadCommands() {
  const commandsPath = path.join(__dirname, 'commands');
  
  // Crear directorio si no existe
  if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
  }
  
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    
    if ('data' in command.default && 'execute' in command.default) {
      client.commands.set(command.default.data.name, command.default);
      console.log(`✅ Comando cargado: ${command.default.data.name}`);
    } else {
      console.log(`⚠️  El comando en ${filePath} no tiene las propiedades requeridas.`);
    }
  }
}

// Función para cargar eventos
async function loadEvents() {
  const eventsPath = path.join(__dirname, 'events');
  
  // Crear directorio si no existe
  if (!fs.existsSync(eventsPath)) {
    fs.mkdirSync(eventsPath, { recursive: true });
  }
  
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
    console.log(`✅ Evento cargado: ${event.default.name}`);
  }
}

// Manejar interacciones de comandos
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No se encontró el comando ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ 
        content: '¡Hubo un error al ejecutar este comando!', 
        ephemeral: true 
      });
    } else {
      await interaction.reply({ 
        content: '¡Hubo un error al ejecutar este comando!', 
        ephemeral: true 
      });
    }
  }
});

// Evento cuando el bot está listo
client.once('ready', () => {
  console.log(`🤖 ${client.user.tag} está en línea!`);
  console.log(`📊 Servidores: ${client.guilds.cache.size}`);
  console.log(`👥 Usuarios: ${client.users.cache.size}`);
});

// Manejar errores
client.on('error', error => {
  console.error('Error del cliente Discord:', error);
});

process.on('unhandledRejection', error => {
  console.error('Error no manejado:', error);
});

// Cargar comandos y eventos
await loadCommands();
await loadEvents();

// Conectar el bot
client.login(process.env.DISCORD_TOKEN); 