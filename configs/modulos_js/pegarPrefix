const { default_prefix } = require("../config.json");
const ServerConfig = require("../../schemas/serverConfig");

async function obterPrefixo(guildId) {
  const serverConfig = await ServerConfig.findOne({ guildId });
  return serverConfig ? serverConfig.prefix : default_prefix;
}
module.exports = {
  obterPrefixo,
};
