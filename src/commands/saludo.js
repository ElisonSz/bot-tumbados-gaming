import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('saludo')
    .setDescription('Te saluda de manera personalizada'),
  
  async execute(interaction) {
    const user = interaction.user;
    const guild = interaction.guild;
    
    // Array de saludos variados
    const saludos = [
      `¡Hola ${user}! 👋 ¡Qué tal estás?`,
      `¡Saludos ${user}! 🎮 ¿Listo para jugar?`,
      `¡Hey ${user}! 🚀 ¡Bienvenido a Tumbados Gaming!`,
      `¡Qué onda ${user}! 🎯 ¿Cómo va tu día?`,
      `¡Hola ${user}! ⚡ ¡Espero que estés teniendo un buen día!`,
      `¡Saludos ${user}! 🎪 ¡Bienvenido a la comunidad!`,
      `¡Hey ${user}! 🎲 ¿Listo para algunas partidas?`,
      `¡Hola ${user}! 🎨 ¡Qué bueno verte por aquí!`
    ];
    
    // Seleccionar un saludo aleatorio
    const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
    
    // Crear embed con el saludo
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('🤖 Saludo de Tumbados Gaming Bot')
      .setDescription(saludoAleatorio)
      .addFields(
        { 
          name: '👤 Usuario', 
          value: user.tag, 
          inline: true 
        },
        { 
          name: '🏠 Servidor', 
          value: guild.name, 
          inline: true 
        },
        { 
          name: '⏰ Hora', 
          value: `<t:${Math.floor(Date.now() / 1000)}:t>`, 
          inline: true 
        }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({ 
        text: '¡Gracias por usar Tumbados Gaming Bot!',
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
}; 