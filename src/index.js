import 'dotenv/config';
import { Telegraf, session } from 'telegraf';
import * as commands from './commands/index.js';
import { startHandler } from './commands/start/index.js';
import { config } from './config/index.js';
import * as scenes from './scenes/index.js';
import { stage } from './scenes/stage.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands(config.commandsList);

bot.use(session());

bot.use(stage.middleware());

bot.start(startHandler);

for (const command in commands) {
  bot.command(command.toLowerCase(), commands[command]);
}

for (const myscene in scenes) {
  bot.command(myscene.toLowerCase(), (ctx) => ctx.scene.enter(myscene));
}

bot.help((ctx) => ctx.reply('Its help))'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
