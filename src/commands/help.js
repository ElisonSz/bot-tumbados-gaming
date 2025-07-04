import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra todos los comandos disponibles'),
  
  async execute(interaction) {
    const commands = interaction.client.commands;
    
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🤖 Comandos de Tumbados Gaming Bot')
      .setDescription('Aquí tienes todos los comandos disponibles:')
      .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ 
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();
    
    // Agrupar comandos por categorías (puedes personalizar esto)
    const commandList = commands.map(command => {
      return {
        name: `/${command.data.name}`,
        value: command.data.description || 'Sin descripción',
        inline: true
      };
    });
    
    // Dividir en campos de máximo 25 comandos por campo
    const fieldsPerEmbed = 25;
    for (let i = 0; i < commandList.length; i += fieldsPerEmbed) {
      const fieldCommands = commandList.slice(i, i + fieldsPerEmbed);
      
      const fieldName = i === 0 ? '📋 Comandos Disponibles' : `📋 Comandos (continuación)`;
      const fieldValue = fieldCommands.map(cmd => `**${cmd.name}**\n${cmd.value}`).join('\n\n');
      
      embed.addFields({
        name: fieldName,
        value: fieldValue,
        inline: false
      });
    }
    
    // Si no hay comandos
    if (commandList.length === 0) {
      embed.addFields({
        name: '❌ Sin comandos',
        value: 'No hay comandos disponibles en este momento.',
        inline: false
      });
    }
    
    await interaction.reply({ embeds: [embed] });
  },
}; 