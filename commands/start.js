const config = require('../config');
const isAdmin = require('../utils/isAdmin');
const isRegistered = require('../utils/isRegistered');

const start = async (ctx) => {
  const user = ctx.from;
  (await isRegistered(ctx))
    ? await ctx.replyWithHTML('<b>🔥 You have already registered</b> ')
    : await ctx.replyWithHTML('<b>🙅‍♂️ You are not registered</b>');

  (await isAdmin(ctx)) && ctx.replyWithHTML(`<b>🔥 You are admin!</b>`);

  await ctx.replyWithHTML(
    `<b>👋 Hello, ${ctx.from.first_name}${
      user.last_name ? ' ' + user.last_name : ''
    }!</b>` +
      `\n` +
      `<b>👨‍💻 Your current id:</b> ${user.id}` +
      `\n` +
      `<b>💰 Your current ballance:</b> ${0} sums` +
      `\n\n` +
      `📝 <b>Invite your friends to our application and earn balls:</b>` +
      `\n` +
      `Share this link: https://t.me/` +
      `${config.BOT_USERNAME}/start?id=${user.id}`
  );
};

module.exports = start;
