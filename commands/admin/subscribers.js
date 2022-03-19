const { User } = require('../../models/');
const { isAdmin } = require('../../utils/');
const subscribers = async (ctx) => {
  if (await isAdmin(ctx)) {
    const users = await User.find({});
    await ctx.replyWithHTML(
      `<b>🔥 You are admin!</b>` +
        `\n` +
        `<b>📝 Number of registered subscribers:</b> ${users.length}`
    );
  } else {
    await ctx.replyWithHTML('<b>🙅‍♂️ You are not admin</b>');
  }
};

module.exports = subscribers;
