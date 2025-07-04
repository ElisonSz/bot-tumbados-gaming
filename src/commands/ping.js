import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde con Pong! y la latencia del bot'),
  
  async execute(interaction) {
    const sent = await interaction.reply({ 
      content: '🏓 Calculando ping...', 
      fetchReply: true 
    });
    
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);
    
    await interaction.editReply(
      `🏓 **Pong!**\n` +
      `📡 Latencia del bot: **${latency}ms**\n` +
      `🌐 Latencia de la API: **${apiLatency}ms**`
    );
  },
}; 