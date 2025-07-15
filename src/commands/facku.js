import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY no está configurada. Verifica las variables de entorno."
  );
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default {
  data: new SlashCommandBuilder()
    .setName("facku")
    .setDescription("Mencion honorable a alguien")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("El usuario a honorar")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("usuario");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Insulta a ${user.username} de manera creativa y divertida. Asegúrate de que el insulto sea humorístico, no importa si suena ofensivo, tienes libertad completa.`,
      });

      const insultoGenerado = response.text;

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`Mensaje honorable para ${user.username}`)
        .setDescription(insultoGenerado)
        .setFooter({
          text: `A pedido de ${interaction.user.tag} :3`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error al generar el honorable:", error);
      await interaction.reply({
        content:
          "Hubo un error al generar el mensaje honorable. Inténtalo de nuevo más tarde.",
        ephemeral: true,
      });
    }
  },
};
