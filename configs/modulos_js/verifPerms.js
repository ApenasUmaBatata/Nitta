const { PermissionsBitField } = require("discord.js");
function verifADM(message) {
  if (
    !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    return false;
  }
  return true;
}

async function confTime(message, content, deleteDelay = 5000) {
  const repliedMessage = await message.reply(content);
  setTimeout(() => repliedMessage.delete(), deleteDelay);
  setTimeout(() => message.delete(), deleteDelay);
}

/*const { modouso } = require("../../configs/arquivos_json/modUso.json");
const { obterPrefixo } = require("../../configs/modulos_js/pegarPrefix");

async function verificarArgs(message, args) {
  if (args.length < 1) {
    const guildId = message.guild.id;
    const prefixo = await obterPrefixo(guildId);
    const mensagem = `\`\`\`${prefixo}${modouso.pt.administracao.enquete}\`\`\``;
    message.channel.send(mensagem);
    return true;
  }
  return false;
}*/

module.exports = {
  verifADM,
  confTime,
  //verificarArgs,
};
