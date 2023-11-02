const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const mongoose = require("mongoose");
const Pessoa = require("../../schemas/Pessoa");

module.exports = {
  config: {
    name: "perfil",
    aliases: ["carteira","saldo"],
  },
  run: async (bot, message, args, tools) => {
    let userId;
    if (message.mentions.members.first()) {
      userId = message.mentions.members.first().id;
    } else {
      userId = message.author.id;
    }
    const mentionMember = message.mentions.members.first();
    const nome =
      userId === message.author.id
        ? "Você não possui registro. Utilize o comando `registrar` para ter acesso a sua carteira!"
        : `${mentionMember} não possui registro, peça para que ele utilize o comando` +
          "`registrar`" +
          `para que você possa ver a carteira dele!`;

    const guildId = message.guild.id;
    Pessoa.findOne({ user_id: userId, guild_id: guildId })
      .then((result) => {
        if (!result) {
          message.reply(nome);
        } else {
          const file = new AttachmentBuilder(
            "nitta/perfilNITTA/Nitta3Expanded.jpg"
          );
          const frase = result.frase;
          const coins = result.coins;
          const gems = result.gems;
          const xp = result.xp;
          const title =
            userId === message.author.id
              ? "Você está vendo a sua carteira"
              : `Você está vendo a carteira do ${mentionMember.user.username}`;
          const embed = new EmbedBuilder()
            .setTitle(`${title}`)
            .addFields(
              {
                name: "Frase",
                value: `\`${frase}\``,
              },
              {
                name: "Moedas sagradas",
                value: `\`${coins}\``,
                inline: true,
              },
              {
                name: "Gemas",
                value: `\`${gems}\``,
                inline: true,
              },
              {
                name: "Xp",
                value: `\`${xp}\``,
                inline: true,
              }
            )
            .setColor("#ff0066")
            .setImage("attachment://Nitta3Expanded.jpg")
            .setFooter({
              text: `${message.author.username}. Mais itens podem ser adicionados em breve`,
              iconURL: message.author.avatarURL(),
            })
            .setTimestamp();
          message
            .reply({ embeds: [embed], files: [file] })
            .then((repliedMessage) => {
              setTimeout(() => repliedMessage.delete(), 10000);
              setTimeout(() => message.delete(), 10000);
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar registro:", error);
      });
  },
};
