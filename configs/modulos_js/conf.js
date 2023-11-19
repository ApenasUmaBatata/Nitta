async function confTime(message, content, deleteDelay = 10000) {
  const repliedMessage = await message.reply(content);
  setTimeout(() => repliedMessage.delete(), deleteDelay);
  setTimeout(() => message.delete(), deleteDelay);
}
module.exports = {
  confTime,
};
