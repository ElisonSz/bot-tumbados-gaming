import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('jona')
    .setDescription('Un mensaje especial ❤️'),
  
  async execute(interaction) {
    // Agregar emojis de corazón
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    const randomHeart = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Array de imágenes románticas (URLs de imágenes libres de derechos)
    const romanticImages = [
      // Imágenes románticas de Unsplash
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516589091380-5d8e21be98d5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516589091380-5d8e21be98d5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop',
      // GIFs románticos de Giphy (URLs directas)
      'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
      'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
      'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
      'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
      // Más imágenes románticas
      'https://images.unsplash.com/photo-1516589091380-5d8e21be98d5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop'
    ];
    
    // Seleccionar imagen aleatoria
    const randomImage = romanticImages[Math.floor(Math.random() * romanticImages.length)];
    
    // Crear embed con la imagen
    const embed = new EmbedBuilder()
      .setColor('#ff69b4') // Color rosa romántico
      .setTitle('💕 Mensaje de Amor 💕')
      .setDescription(`${randomHeart} **Holamiamor <3** ${randomHeart}`)
      .setImage(randomImage)
      .setFooter({ 
        text: 'Con mucho amor desde Tumbados Gaming Bot 💖',
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    await interaction.reply({ 
      embeds: [embed],
      ephemeral: false
    });
  },
}; 