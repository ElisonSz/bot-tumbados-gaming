import { Events, EmbedBuilder } from 'discord.js';

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    // Ignorar mensajes de bots
    if (message.author.bot) return;

    // Verificar si el mensaje es de syxver
    if (message.author.username.toLowerCase() === 'syxver' || 
        message.member?.displayName.toLowerCase() === 'syxver') {
      await message.reply('ESE RIFLE ES DE MI NOVIA!! 💕');
      console.log(`💕 syxver dijo algo, respondí con ESE RIFLE ES DE MI NOVIA!!`);
      return;
    }

    const minWordsLength = 10;
    const minWordsLengthIsMoreThanLimit = message?.content?.split(' ').length > minWordsLength;

    if (minWordsLengthIsMoreThanLimit) {
      await message.reply({
        content: 'Apoco si mi PndJo 🗿',
        files: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iwwL5jEA8TWbFmoBui0qRVooG2Bb6gig-w&s"]
      });
      console.log(`Alguien dijo algo, respondí con Apoco si mi PndJo`);
      return;
    }

    // Verificar si el bot fue mencionado
    const botMentioned = message.mentions.users.has(message.client.user.id);

    if (botMentioned) {
      const user = message.author;
      const guild = message.guild;

      // Array de respuestas variadas cuando es mencionado
      const respuestas = [
        `¡Hola ${user}! 👋 ¿En qué puedo ayudarte?`,
        `¡Hey ${user}! 🎮 ¿Necesitas algo?`,
        `¡Saludos ${user}! 🚀 ¿Qué tal va tu día?`,
        `¡Qué onda ${user}! 🎯 ¿Todo bien?`,
        `¡Hola ${user}! ⚡ ¡Aquí estoy para ayudarte!`,
        `¡Hey ${user}! 🎪 ¿Qué se te ofrece?`,
        `¡Saludos ${user}! 🎲 ¿Listo para jugar?`,
        `¡Hola ${user}! 🎨 ¡Qué bueno verte!`
      ];

      // Seleccionar una respuesta aleatoria
      const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];

      // Crear embed de respuesta
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🤖 ¡Me mencionaste!')
        .setDescription(respuestaAleatoria)
        .addFields(
          {
            name: '💡 Tip',
            value: 'Usa `/help` para ver todos mis comandos disponibles',
            inline: false
          },
          {
            name: '👤 Usuario',
            value: user.tag,
            inline: true
          },
          {
            name: '🏠 Servidor',
            value: guild.name,
            inline: true
          }
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({
          text: 'Tumbados Gaming Bot - Responde a menciones',
          iconURL: message.client.user.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp();

      // Responder al mensaje
      await message.reply({ embeds: [embed] });

      console.log(`🤖 Bot mencionado por ${user.tag} en ${guild.name}`);
    }
  },
}; 