import { Telegraf } from 'telegraf';
import 'dotenv/config';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('hi'));

bot.help((ctx) => ctx.reply('Send me a sticker'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
