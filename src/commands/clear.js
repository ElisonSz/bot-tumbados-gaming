import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Elimina una cantidad específica de mensajes del canal')
    .addIntegerOption(option =>
      option.setName('cantidad')
        .setDescription('Número de mensajes a eliminar (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
  async execute(interaction) {
    const amount = interaction.options.getInteger('cantidad');
    
    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ No tienes permisos para eliminar mensajes.',
        ephemeral: true
      });
    }
    
    if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ No tengo permisos para eliminar mensajes en este canal.',
        ephemeral: true
      });
    }
    
    try {
      // Eliminar mensajes
      const deleted = await interaction.channel.bulkDelete(amount, true);
      
      // Responder con confirmación
      const reply = await interaction.reply({
        content: `✅ Se eliminaron **${deleted.size}** mensajes del canal.`,
        ephemeral: true
      });
      
      // Eliminar la confirmación después de 5 segundos
      setTimeout(async () => {
        try {
          await reply.delete();
        } catch (error) {
          // Ignorar errores si el mensaje ya fue eliminado
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error al eliminar mensajes:', error);
      
      if (error.code === 50034) {
        await interaction.reply({
          content: '❌ No puedo eliminar mensajes más antiguos de 14 días.',
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: '❌ Ocurrió un error al eliminar los mensajes.',
          ephemeral: true
        });
      }
    }
  },
}; 