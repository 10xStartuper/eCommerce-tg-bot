const { config } = require('../config');
const User = require('../models/user.model');
const { isAdmin, isRegistered } = require('../utils/');
const start = async (ctx) => {
  (await isRegistered(ctx))
    ? await ctx.replyWithHTML('<b>🔥 You have already registered</b> ')
    : await ctx.replyWithHTML('<b>🙅‍♂️ You are not registered</b>');

  (await isAdmin(ctx)) && ctx.replyWithHTML(`<b>🔥 You are admin!</b>`);
  const user = await User.findOne({ user_id: ctx.from.id });
  await ctx.replyWithHTML(
    `<b>👋 Hello, ${user.first_name} ${user.last_name}!</b>` +
      `\n` +
      `<b>👨‍💻 Your current id:</b> ${user.user_id}` +
      `\n` +
      `<b>💰 Your current balance:</b> ${user.balance} sums` +
      `\n\n` +
      `📝 <b>Invite your friends to our application and earn balls:</b>` +
      `\n` +
      `Share this link: https://t.me/` +
      `${config.BOT_USERNAME}/start?id=${user._id}`
  );
};

module.exports = start;
