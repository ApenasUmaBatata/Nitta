const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "botinfo",
    aliases: ["info", "on", "convite", "invite", "bot", "ping"]
  },
  run: async (bot, message, args) => {
    function formatUptime(ms) {
      const segundos = Math.floor(ms / 1000) % 60;
      const minutos = Math.floor(ms / 60000) % 60;
      const horas = Math.floor(ms / 3600000) % 24;
      const dias = Math.floor(ms / 86400000);
      const semanas = Math.floor(dias / 7);
      const remainingDays = dias % 7;

      let uptime = "";
      if (semanas > 0) {
        uptime += `${semanas} ${semanas === 1 ? "semana" : "semanas"} `;
      }
      if (remainingDays > 0) {
        uptime += `${remainingDays} ${remainingDays === 1 ? "dia" : "dias"} `;
      }
      uptime += `${horas}h `;
      uptime += `${minutos}m `;
      uptime += `${segundos}s`;

      return uptime.trim();
    }
    const uptime = formatUptime(bot.uptime);
    const startTime = Date.now();

    const endTime = Date.now();
    const ping = endTime - startTime;
    const owner = "SrBatata#2449";

    botembed = new EmbedBuilder()
      .setColor("#ff0066")
      .setAuthor({
        name: `Algumas informações sobre mim!`,
        iconURL: bot.user.avatarURL(),
      })
      .setImage("https://i.imgur.com/t8s41Lu.png")
      .addFields(
        {
          name: "Informações gerais",
          value: `\`Me chamo ${bot.user.username}, fui criada por ${owner} com o objetivo de melhorar servidores, entreter membros, moderar e ser atenciosa com todos os membros que tiver contato.\``,
          inline: true,
        },
        {
          name: "Informações adicionais",
          value: `\`Atualmente tenho ${bot.commands.size} comandos, estou acordada á ${uptime}, me encontro em ${bot.guilds.cache.size} servidores.\``,
          inline: true,
        },
        /* {
          name: "Conexões",
          value: `\`Minha conexão com a internet: ${ping}ms \nMinha conexão com o discord: ${bot.ws.ping}ms\``
        }, */
        {
          name: "Me convide",
          value: `[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=705547264537657465&permissions=8&scope=bot%20applications.commands)`,
          //value: `[Clique aqui para mais informações](https://github.com/ApenasUmaBatata/botRam/blob/master/RamFAQ/pt-BR.md)`,
        }
      );

    message.reply({ embeds: [botembed] }).then((repliedMessage) => {
      setTimeout(() => repliedMessage.delete(), 10000);
      setTimeout(() => message.delete(), 10000);
    });
  },
};
