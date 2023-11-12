const { EmbedBuilder, PermissionsBitField } = require("discord.js");
//const { default_prefix } = require("../../configs/config.json");
const ServerConfig = require("../../schemas/serverConfig");
module.exports = {
  config: {
    name: "prefix",
    aliases: ["sp", "setprefix"],
  },
  run: async (bot, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      return message
        .reply(`Esse comando é apenas para \`Administradores\`.`)
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 5000);
          setTimeout(() => message.delete(), 5000);
        });
    }

    if (args.length !== 1) {
      const guildId = message.guild.id;
      const serverConfig = await ServerConfig.findOne({ guildId });
      return message.reply(`Utilização incorreta. Use ${serverConfig.prefix}setprefix [novo_prefixo]`);
    }

    const newPrefix = args[0];

    if (newPrefix === "default" || newPrefix === "padrao") {
      // Restaurar o prefixo padrão
      try {
        const guildId = message.guild.id;
        const serverConfig = await ServerConfig.findOne({ guildId });

        if (serverConfig) {
          serverConfig.prefix = default_prefix;
          await serverConfig.save();
        } else {
          await ServerConfig.create({ guildId, prefix: default_prefix });
        }

        message.reply(`Prefixo restaurado para o padrão: ${default_prefix}`);
      } catch (err) {
        console.error(err);
        message.reply("Ocorreu um erro ao restaurar o prefixo padrão.");
      }
    } else {
      // Definir um novo prefixo
      try {
        const guildId = message.guild.id;
        const serverConfig = await ServerConfig.findOne({ guildId });

        if (serverConfig) {
          serverConfig.prefix = newPrefix;
          await serverConfig.save();
        } else {
          await ServerConfig.create({ guildId, prefix: newPrefix });
        }

        message.reply(`Prefixo definido como: ${newPrefix}`);
      } catch (err) {
        console.error(err);
        message.reply("Ocorreu um erro ao definir o prefixo.");
      }
    }
  },
};
