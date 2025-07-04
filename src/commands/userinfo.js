import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Muestra información sobre un usuario')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('El usuario del que quieres ver información')
        .setRequired(false)),
  
  async execute(interaction) {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const member = await interaction.guild.members.fetch(targetUser.id);
    
    // Obtener información del usuario
    const roles = member.roles.cache
      .filter(role => role.id !== interaction.guild.id)
      .map(role => role.name)
      .join(', ') || 'Sin roles';
    
    const permissions = member.permissions.toArray().join(', ') || 'Sin permisos especiales';
    
    // Crear embed
    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor)
      .setTitle(`👤 Información de ${targetUser.username}`)
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { 
          name: '🆔 ID', 
          value: targetUser.id, 
          inline: true 
        },
        { 
          name: '📅 Cuenta creada', 
          value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`, 
          inline: true 
        },
        { 
          name: '📥 Se unió al servidor', 
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, 
          inline: true 
        },
        { 
          name: '🎭 Roles', 
          value: roles.length > 1024 ? 'Demasiados roles para mostrar' : roles, 
          inline: false 
        },
        { 
          name: '🔑 Permisos', 
          value: permissions.length > 1024 ? 'Demasiados permisos para mostrar' : permissions, 
          inline: false 
        }
      )
      .setFooter({ 
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    // Agregar información adicional si es el propietario del servidor
    if (member.id === interaction.guild.ownerId) {
      embed.addFields({ 
        name: '👑 Propietario del Servidor', 
        value: 'Sí', 
        inline: true 
      });
    }
    
    await interaction.reply({ embeds: [embed] });
  },
}; 