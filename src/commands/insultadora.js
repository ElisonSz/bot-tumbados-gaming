import { GoogleGenAI } from "@google/genai";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("insultar")
    .setDescription("Insulta a alguien")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("El usuario a insultar")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("insulto")
        .setDescription("Instrucciones opcionales para el insulto")
        .setRequired(true)
    ),
  async execute(interaction) {
    let personalizarInsulto = "";
    const user = interaction.options.getUser("usuario");
    const insulto = interaction.options.getString("insulto");

    if (insulto) {
      personalizarInsulto = `Aquí tienes un ejemplo para personalizar el insulto: ${insulto}. `;
    }

    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    });

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Insulta a ${user.username} de manera creativa y divertida. ${personalizarInsulto}
                Asegúrate de que el insulto sea humorístico, no importa si suena ofensivo, tienes libertad completa.`,
      });

      const insultoGenerado = response.text;

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`Insulto para ${user.username}`)
        .setDescription(insultoGenerado)
        .setFooter({
          text: `A pedido de ${interaction.user.tag} :3`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error al generar el insulto:", error);
      await interaction.reply({
        content:
          "Hubo un error al generar el insulto. Inténtalo de nuevo más tarde.",
        ephemeral: true,
      });
    }
  },
};
