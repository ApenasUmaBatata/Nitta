const { EmbedBuilder } = require("discord.js");
module.exports = {
  config: {
    name: "falar",
    aliases: []
  },
  run: async (bot, message, args) => {
    let canal = message.channel;
    let fala;

    if (message.mentions.channels.size > 0) {
      canal = message.mentions.channels.first();
      fala = args.slice(1).join(" ");
    } else {
      fala = args.join(" ");
    }

    if (!fala) {
      return message.reply("Especifique o que eu preciso falar!").then(repliedMessage => {
        setTimeout(() => repliedMessage.delete(), 5000);
        setTimeout(() => message.delete(),5000)
      });
    }
    const ebd = new EmbedBuilder()
      .setDescription(
        `\`${message.author.username}#${message.author.discriminator}\` falou \`${fala}\` em \`${message.guild.name}\``
      )
      .setFooter({ text: `Executado dia ` })
      .setTimestamp();
    bot.channels.cache.get("1093554760386355282").send({ embeds: [ebd] });
    canal.send(`${fala}`);
    message.delete();
  },
};
