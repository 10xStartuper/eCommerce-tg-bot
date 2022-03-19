require('dotenv').config();
const { config } = require('./config');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(config.BOT_TOKEN);
const mongoose = require('mongoose');
const express = require('express');
const { start, subscribers } = require('./commands/');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

bot.start((ctx) => start(ctx));
bot.command('subscribers', (ctx) => subscribers(ctx));

const main = async () => {
  await mongoose.connect(
    `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.qlg2b.mongodb.net/tgapp?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  app.use('/', require('./routes/'));
  await bot.launch().then(() => console.log('Bot has been started'));
  app.listen(config.PORT, () =>
    console.log('Server has been started' + ' on port ' + config.PORT)
  );
};

main().catch((err) => console.log(err));
