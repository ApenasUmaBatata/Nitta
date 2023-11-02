const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");
const ServerConfig = require("../../schemas/serverConfig")
const Pessoa = require("../../schemas/Pessoa");


module.exports = async (bot, message, args) => {
  //#region mencionar o bot
  if (message.mentions.has(bot.user.id)) {
    const guildId = message.guild.id;
    const serverConfig = await ServerConfig.findOne({ guildId });
    const prefix = serverConfig ? serverConfig.prefix : default_prefix;
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Você está perdido? Estou aqui para te ajudar!`,
        iconURL: bot.user.avatarURL(),
      })
      .setFooter({
        text: message.author.username,
        iconURL: message.author.avatarURL(),
      })
      .setColor("#ff0066")
      .setDescription(
        `Olá jovem guerreiro, estava em minha caminhada matinal e escutei por seus gritos, se estiver perdido use \`${prefix}ajuda\`. Lembrando, uma viagem pode ser muito perigosa se você estiver sozinho!`
      );
    message.reply({ embeds: [embed] });
  }
//#endregion
  //#region cadastro e xp por mensagem
  const userId = message.author.id;
  const guildId = message.guild.id;
  if (!message.guild) return;
  
  const xpAmount = Math.floor(Math.random() * 50) + 0;
  const fra = "A pessoa não deixou uma frase aqui!"

  // Verificar se o usuário já está registrado na guild
  Pessoa.findOne({ user_id: userId, guild_id: guildId })
    .then((result) => {
      if (!result) {
        // Inserir um novo registro no MongoDB
        const novaPessoa = new Pessoa({
          user_id: userId,
          guild_id: guildId,
          coins: 0, 
          gems: 0, 
          xp: 0, 
          frase: fra,
          last_claimed: new Date("1970-01-01T00:00:00"),
        });

        novaPessoa.save().catch((error) => {
          console.error("Erro ao salvar novo registro:", error);
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar registro existente:", error);
    });
  Pessoa.findOne({ user_id: userId, guild_id: guildId })
    .then((result) => {
      if (!result) {
      } else {
        const currentXp = result.xp || 0;
        const newXp = currentXp + xpAmount;
        Pessoa.updateOne({ user_id: userId, guild_id: guildId }, { xp: newXp })
          .then(() => {
          })
          .catch((error) => {
            console.error("Erro ao atualizar XP:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar registro existente:", error);
    });
//#endregion
  //#region executar comandos
  const serverConfig = await ServerConfig.findOne({ guildId });
  const prefix = serverConfig ? serverConfig.prefix : default_prefix;
  const frases = [
    `Não reconheci esse comando, de uma olhada em \`${prefix}ajuda\`!`,
    `Esse comando pode não existir, de um olhada em \`${prefix}ajuda\`!`,
  ];
  let fras = frases[Math.floor(Math.random() * frases.length)];

  var args = message.content.substring(prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)
  )
    return;

  let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (command) {
    command.run(bot, message, args);
    const ebd = new EmbedBuilder()
      .setDescription(
        `\`${message.author.username}#${message.author.discriminator}\` executou \`${cmd}\` em \`${message.guild.name}\``
      )
      .setFooter({ text: `Executado dia ` })
      .setTimestamp();
    bot.channels.cache.get("878417697233338418").send({ embeds: [ebd] });
  } else {
    message.reply(`${fras}`);
  }
  //#endregion
};
