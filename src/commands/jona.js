import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('jona')
    .setDescription('Un mensaje especial para Jona ❤️'),
  
  async execute(interaction) {
    const user = interaction.user;
    
    // Crear embed con el mensaje especial
    const embed = new EmbedBuilder()
      .setColor('#ff69b4') // Color rosa para el amor
      .setTitle('💕 Mensaje Especial 💕')
      .setDescription(`**Holamiamor <3**`)
      .addFields(
        { 
          name: '👤 De', 
          value: user.tag, 
          inline: true 
        },
        { 
          name: '💝 Para', 
          value: 'Jona', 
          inline: true 
        },
        { 
          name: '⏰ Enviado', 
          value: `<t:${Math.floor(Date.now() / 1000)}:t>`, 
          inline: true 
        }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({ 
        text: 'Con mucho amor desde Tumbados Gaming Bot 💖',
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    // Agregar emojis de corazón
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    const randomHeart = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    await interaction.reply({ 
      content: `${randomHeart} **Holamiamor <3** ${randomHeart}`,
      embeds: [embed] 
    });
  },
}; 