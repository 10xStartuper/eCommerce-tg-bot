const { config } = require('../config');
const User = require('../models/user.model');
const { isAdmin, isRegistered, addSubscriber } = require('../utils/');
const start = async (ctx) => {
  (await isAdmin(ctx)) && ctx.replyWithHTML(`<b>🔥 You are admin!</b>`);
  if (await isRegistered(ctx)) {
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
        `${config.BOT_USERNAME}?start=${user._id}` +
        `\n\n` +
        `${
          (await isAdmin(ctx)) &&
          'Admin commands: \n/subscribers - Show number of subscribers \n/add_balance - Add balance, \n/remove_balance, /add_user, /remove_user'
        }`
    );
  } else {
    await addSubscriber(ctx);
    await ctx.replyWithHTML(
      '<b>🙅‍♂️ You are not registered!</b>\n Please register http://localhost:8080/register/' +
        ctx.from.id
    );
  }
  console.log(ctx.startPayload ? ctx.startPayload : 'direct');
};

module.exports = start;
