const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const ServerConfig = require("../../schemas/serverConfig");

module.exports = {
  config: {
    name: "prefix",
    aliases: ["setprefix", "prefixo"],
  },
  run: async (bot, message, args) => {
    await message.react("✅");

    // PERMISSION
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply(`Esse comando é apenas para \`Administradores\`.`)
        .then((repliedMessage) => {
          setTimeout(() => repliedMessage.delete(), 5000);
          setTimeout(() => message.delete(), 5000);
        });
    }

    const { default_prefix } = require("../../configs/config.json");
    const pref = await ServerConfig.findOne({ guildId: message.guild.id });

    if (!args[0]) {
      const embed = new EmbedBuilder()
        .setTitle("❌|Erro")
        .setAuthor({
          name: `Comando executado por: ${message.author.username}`,
          iconURL: message.author.avatarURL(),
        })
        .setColor("#ff0066")
        .setDescription(`Modo de uso: \n \`${pref ? pref.prefix : default_prefix}setprefix <novo prefixo>\``);

      return message.channel.send({ embeds: [embed] });
    }

    if (args[1]) {
      return message.channel.send("Você não pode definir o prefixo com um argumento duplo!");
    }

    if (args[0].length > 3) {
      return message.channel.send("Você não pode enviar um prefixo com mais de 3 caracteres!");
    }

    if (args.join("") === default_prefix) {
      await ServerConfig.findOneAndRemove({ guildId: message.guild.id });
      // Aqui definimos o prefixo do bot de volta ao prefixo padrão
      bot.prefix = default_prefix;
      return await message.channel.send(`O prefixo voltou a ser \`${default_prefix}\`!`);
    }

    let newPrefix = args[0];

    if (pref) {
      pref.prefix = newPrefix;
      await pref.save();
    } else {
      await ServerConfig.create({
        guildId: message.guild.id,
        prefix: newPrefix,
      });
    }

    // Atualizamos o prefixo do bot com o novo prefixo configurado
    bot.prefix = newPrefix;

    const embed = new EmbedBuilder()
      .setTitle("Novo prefixo setado")
      .setColor("#ff0066")
      .setAuthor({
        name: `Comando executado por: ${message.author.username}`,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(`Agora eu respondo por: \n \`${newPrefix} <seus comandos>\``);

    await message.channel.send({ embeds: [embed] });
  },
};
