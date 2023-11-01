const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");

module.exports = async (bot, guild, message) => {
  bot.users.fetch(guild.ownerId, false).then((user) => {
    user.send(
      `Obrigado por me convidar para ${guild.name}. \n Utilize ${default_prefix}ajuda para ver meus comandos!`
    );
  });
  //------------------------------------------------------------------
  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setDescription(`Fui adicionada em \`${guild.name}\``)
    .setFooter({ text: `Fui adicionada dia ` })
    .setTimestamp();
  bot.channels.cache.get("878108271439904818").send({ embeds: [embed] });
};
