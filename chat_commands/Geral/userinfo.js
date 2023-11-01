const { EmbedBuilder } = require("discord.js");
module.exports = {
  config: {
    name: "usuario",
    aliases: ["membro","user"],
  },
  run: async (bot, message, args) => {
    let picon = message.mentions.members.first() || message.member;
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    if (member.user.bot === true) {
      bot = "Sim";
    } else {
      bot = "Não";
    }

    let embed = new EmbedBuilder()
      .setThumbnail(picon.user.avatarURL())
      .setColor("#ff0066")
      .setFooter({ text: `Informações sobre: ${member.user.username}` })
      .setTimestamp()
      .addFields(
        {
          name: "Nome de usuário",
          value: `${member.user.tag}`,
          inline: true,
        },
        {
          name: "Nickname",
          value: `${
            member.nickname !== null ? `${member.nickname}` : "Nenhum"
          }`,
          inline: true,
        },
        {
          name: "Bot",
          value: `${bot}`,
          inline: true,
        },
        {
          name: "Cargos",
          value: `${
            member.roles.cache
              .filter((r) => r.id !== message.guild.id)
              .map((roles) => `\`${roles.name}\``)
              .join(" **|** ") || "Não possui cargos"
          }`,
          inline: true,
        }
      );

    //.addField("Status", `${status[member.user.presence.status]}`, inline, true)
    //.addField("Jogando", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}`: "Não está jogando"}`, inline, true)

    message.reply({ embeds: [embed] }).then((repliedMessage) => {
      setTimeout(() => repliedMessage.delete(), 10000);
      setTimeout(() => message.delete(), 10000);
    });
  },
};