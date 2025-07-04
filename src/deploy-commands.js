import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  
  if ('data' in command.default) {
    commands.push(command.default.data.toJSON());
    console.log(`📝 Comando registrado: ${command.default.data.name}`);
  } else {
    console.log(`⚠️  El comando en ${filePath} no tiene la propiedad 'data' requerida.`);
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`🔄 Iniciando registro de ${commands.length} comandos...`);

    if (process.env.GUILD_ID) {
      // Registrar comandos para un servidor específico (más rápido para desarrollo)
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
      );
      console.log(`✅ Registrados ${data.length} comandos para el servidor.`);
    } else {
      // Registrar comandos globalmente (puede tomar hasta 1 hora en propagarse)
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );
      console.log(`✅ Registrados ${data.length} comandos globalmente.`);
    }
  } catch (error) {
    console.error('❌ Error al registrar comandos:', error);
  }
})(); 