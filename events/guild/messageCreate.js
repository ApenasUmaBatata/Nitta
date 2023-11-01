const { EmbedBuilder } = require("discord.js");
const { default_prefix } = require("../../configs/config.json");
const Pessoa = require("../../schemas/Pessoa");

module.exports = async (bot, message, args) => {
  if (message.mentions.has(bot.user.id)) {
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
        `Olá jovem guerreiro, estava em minha caminhada matinal e escutei por seus gritos, se estiver perdido use \`${default_prefix}ajuda\`. Lembrando, uma viagem pode ser muito perigosa se você estiver sozinho!`
      );
    message.reply({ embeds: [embed] });
  }
  //#region cadastro e xp por mensagem
  const userId = message.author.id;
  if (!message.guild) return;
  const guildId = message.guild.id;
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
          coins: 0, // Defina o valor inicial das moedas, se necessário
          gems: 0, // Defina o valor inicial das gemas, se necessário
          xp: 0, // Defina o valor inicial da XP, se necessário
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

  // Verificar se o usuário já está registrado na guild (segunda verificação)
  Pessoa.findOne({ user_id: userId, guild_id: guildId })
    .then((result) => {
      if (!result) {
        // O usuário não está registrado, você pode decidir como lidar com isso
      } else {
        const currentXp = result.xp || 0;
        const newXp = currentXp + xpAmount;

        // Atualizar o campo 'xp' no documento
        Pessoa.updateOne({ user_id: userId, guild_id: guildId }, { xp: newXp })
          .then(() => {
            // Sucesso na atualização do XP
          })
          .catch((error) => {
            console.error("Erro ao atualizar XP:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar registro existente:", error);
    });

  //#region executar comandos
  const frases = [
    `Não reconheci esse comando, de uma olhada em \`${default_prefix}ajuda\`!`,
    `Esse comando pode não existir, de um olhada em \`${default_prefix}ajuda\`!`,
  ];
  let fras = frases[Math.floor(Math.random() * frases.length)];

  var args = message.content.substring(default_prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(default_prefix)
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
