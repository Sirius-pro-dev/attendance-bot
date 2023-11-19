import 'dotenv/config';
import { Telegraf, Scenes, session } from 'telegraf';
import * as commands from './commands/index.js';
import { startHandler } from './commands/start/index.js';
import { config } from './config/index.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands(config.commandsList);

bot.start(startHandler);

for (const command in commands) {
  bot.command(command, commands[command]);
  console.log(command);
}

bot.help((ctx) => ctx.reply('Its help'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
