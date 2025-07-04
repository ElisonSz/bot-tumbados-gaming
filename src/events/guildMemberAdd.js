import { Events, EmbedBuilder } from 'discord.js';

export default {
  name: Events.GuildMemberAdd,
  once: false,
  execute(member) {
    // Buscar canal de bienvenida (puedes personalizar el nombre)
    const welcomeChannel = member.guild.channels.cache.find(
      channel => channel.name === 'bienvenidas' || 
                channel.name === 'general' ||
                channel.name === 'welcome'
    );
    
    if (welcomeChannel) {
      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🎉 ¡Bienvenido a Tumbados Gaming!')
        .setDescription(`¡Hola ${member}! ¡Bienvenido a nuestro servidor!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { 
            name: '👤 Usuario', 
            value: member.user.tag, 
            inline: true 
          },
          { 
            name: '📅 Se unió', 
            value: `<t:${Math.floor(Date.now() / 1000)}:F>`, 
            inline: true 
          },
          { 
            name: '👥 Miembro #', 
            value: `${member.guild.memberCount}`, 
            inline: true 
          }
        )
        .setFooter({ 
          text: '¡Disfruta tu estadía en Tumbados Gaming!',
          iconURL: member.guild.iconURL({ dynamic: true })
        })
        .setTimestamp();
      
      welcomeChannel.send({ embeds: [embed] });
    }
    
    console.log(`👋 Nuevo miembro: ${member.user.tag} se unió a ${member.guild.name}`);
  },
}; 