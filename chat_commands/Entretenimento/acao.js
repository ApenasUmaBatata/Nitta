const { AttachmentBuilder, EmbedBuilder } = require("discord.js"); // puxando a livraria 'discord.js'
const { default_prefix } = require("../../configs/config.json");

module.exports = {
  config: {
    name: "ação",
    aliases: ["acao"]
  },
  run: async (bot, message, args) => {
    if (!args[0]) {
      const file = new AttachmentBuilder("nitta/Ram/ram3.gif");
      embed = new EmbedBuilder()
        .setAuthor({ name: "Sua ajuda chegou", iconURL: bot.user.avatarURL() })
        .addFields({ name: "Ações", value: "`abraçar`, `tapa`", inline: true })
        .setImage("attachment://ram3.gif")
        .setFooter({
          text: `Digite ' ${default_prefix}ação <CommandName> <Menção>' para que ocorra uma ação!`,
          iconURL: message.author.avatarURL(),
        })
        .setColor("#ff00c3");
      message
        .reply({ embeds: [embed], files: [file] })
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 10000);
          setTimeout(() => message.delete(), 10000);
        });
    }
    //Mencione alguém para que ocorra uma ação!
    if (args[0] == "abraçar") {
      if (!message.mentions.members.first()) {
        //puxando a menção do autor
        message
          .reply("Mencione alguém para que ocorra uma ação!")
          .then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), 5000);
            setTimeout(() => message.delete(), 5000);
          });
      } else {
        //criando uma variavel de opções  para os gifs de abraço
        const abraco = [
          "nitta/RamAcao/RamAbraco/abraco1.gif",
          "nitta/RamAcao/RamAbraco/abraco2.gif",
          "nitta/RamAcao/RamAbraco/abraco3.gif",
        ];
        let img = abraco[Math.floor(Math.random() * abraco.length)];
        const file = new AttachmentBuilder(img);
        var fra = [
          "aqueceu o coração de",
          "deu uma mega abraço em",
          "abraçou",
          "deu um abraço em",
        ];
        let fr = fra[Math.floor(Math.random() * fra.length)]; //randomizando a variael de frases para que caia um aleatorio cada vez que o comando for usado
        message.reply(
          `${message.author} ${fr} ${message.mentions.members.first()}`
        );
        message.channel.send({ files: [file] }); //enviando a embed
      }
    }
    if (args[0] == "tapa") {
      if (!message.mentions.members.first()) {
        //puxano a menção do autor
        message
          .reply("Mencione alguém para que ocorra uma ação!")
          .then((repliedMessage) => {
            setTimeout(() => repliedMessage.delete(), 5000);
            setTimeout(() => message.delete(), 5000);
          });
      } else {
        const tapa = [
          "nitta/RamAcao/RamTapa/tapa1.gif",
          "nitta/RamAcao/RamTapa/tapa2.gif",
          "nitta/RamAcao/RamTapa/tapa3.gif",
          "nitta/RamAcao/RamTapa/tapa4.gif",
        ];
        let img1 = tapa[Math.floor(Math.random() * tapa.length)];
        const file = new AttachmentBuilder(img1);
        var fra = ["deu um tapa em", "acertou com força o rosto de"];
        let fr = fra[Math.floor(Math.random() * fra.length)]; //randomizando a variael de gifs para que caia um aleatorio cada vez que o comando for usado
        message.reply(
          `${message.author} ${fr} ${message.mentions.users.first()}`
        ); //enviando a embed
        message.channel.send({ files: [file] });
      }
    }
  },
};
