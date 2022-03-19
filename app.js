require('dotenv').config();
const { Telegraf } = require('telegraf');
const config = require('./config');
const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => {
  const userId = ctx.from.id;
  ctx.replyWithMarkdown(
    `*👋 Hello, ${ctx.from.first_name}${
      ctx.from.last_name ? ' ' + ctx.from.last_name : ''
    }!*` +
      `\n` +
      `*👨‍💻 Your current id:* ${userId}` +
      `\n` +
      `*📝 Current ChatID:* ${ctx.chat.id}`
  );
});

bot.launch().then(() => console.log('Bot has been started'));
