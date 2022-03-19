require('dotenv').config();
const { Telegraf } = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { leave } = Stage;

// Greeter scene
const name = new Scene('name');
name.enter((ctx) =>
  ctx.reply(
    'Assalomu alaykum botimizga xush kelibsiz iltimos, ismingizni kiriting'
  )
);

name.on('text', (ctx) => {
  ctx.session.name = ctx.message.text;
  return ctx.scene.enter('phone');
});

const phone = new Scene('phone');
phone.enter((ctx) => {
  ctx.reply('Send me a contact');
});

phone.on('contact', (ctx) => {
  ctx.session.phone = ctx.message.contact.phone_number;
  ctx.reply(
    'Your phone number is ' +
      ctx.session.phone +
      'your name is: ' +
      ctx.session.name
  );
  leave();
});
phone.on('text', (ctx) => {
  ctx.reply('send me a contact');
});

// Create scene manager
const stage = new Stage();
stage.command('cancel', leave());

// Scene registration
stage.register(name, phone);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.command('/register', (ctx) => ctx.scene.enter('name'));
bot.startPolling();
