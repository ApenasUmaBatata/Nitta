const { PermissionsBitField } = require("discord.js");
function verifADM(message) {
  if (
    !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    return false;
  }
  return true;
}

module.exports = {
  verifADM,

  //verificarArgs,
};
