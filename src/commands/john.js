import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('john')
    .setDescription('John dice Holamiamor ❤️'),
  
  async execute(interaction) {
    await interaction.reply('Holamiamor ❤️');
  },
}; 