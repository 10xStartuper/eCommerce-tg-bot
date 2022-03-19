require('dotenv').config();
const config = require('./config');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(config.BOT_TOKEN);
const mongoose = require('mongoose');
const express = require('express');
const isAdmin = require('./utils/isAdmin');
const isRegistered = require('./utils/isRegistered');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

bot.start(async (ctx) => {
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
});

const main = async () => {
  await mongoose.connect(
    `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.qlg2b.mongodb.net/tgapp?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  await bot.launch().then(() => console.log('Bot has been started'));
  app.listen(config.PORT, () =>
    console.log('Server has been started' + ' on port ' + config.PORT)
  );
};

main().catch((err) => console.log(err));
