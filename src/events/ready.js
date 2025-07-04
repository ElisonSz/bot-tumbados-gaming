import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`🤖 ${client.user.tag} está en línea!`);
    console.log(`📊 Servidores: ${client.guilds.cache.size}`);
    console.log(`👥 Usuarios: ${client.users.cache.size}`);
    console.log(`⚡ Ping: ${client.ws.ping}ms`);
    
    // Establecer estado del bot
    client.user.setActivity('Tumbados Gaming', { type: 'WATCHING' });
    
    console.log('✅ Bot configurado correctamente');
  },
}; 