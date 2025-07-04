import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Muestra información sobre el servidor'),
  
  async execute(interaction) {
    const guild = interaction.guild;
    
    // Obtener información del servidor
    const owner = await guild.fetchOwner();
    const memberCount = guild.memberCount;
    const channelCount = guild.channels.cache.size;
    const roleCount = guild.roles.cache.size;
    const emojiCount = guild.emojis.cache.size;
    const boostLevel = guild.premiumTier;
    const boostCount = guild.premiumSubscriptionCount;
    
    // Crear embed
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`📊 Información de ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { 
          name: '👑 Propietario', 
          value: `${owner.user.tag}`, 
          inline: true 
        },
        { 
          name: '📅 Creado el', 
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, 
          inline: true 
        },
        { 
          name: '🆔 ID del Servidor', 
          value: guild.id, 
          inline: true 
        },
        { 
          name: '👥 Miembros', 
          value: `${memberCount}`, 
          inline: true 
        },
        { 
          name: '📺 Canales', 
          value: `${channelCount}`, 
          inline: true 
        },
        { 
          name: '🎭 Roles', 
          value: `${roleCount}`, 
          inline: true 
        },
        { 
          name: '😀 Emojis', 
          value: `${emojiCount}`, 
          inline: true 
        },
        { 
          name: '🚀 Nivel de Boost', 
          value: `${boostLevel}`, 
          inline: true 
        },
        { 
          name: '💎 Boosts', 
          value: `${boostCount}`, 
          inline: true 
        }
      )
      .setFooter({ 
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
}; 