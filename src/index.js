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

for (const key in { ...scenes, ...commands }) {
  if (Array.isArray(scenes) && scenes.includes(key)) {
    bot.command(key.toLowerCase(), (ctx) => ctx.scene.enter(key));
  } else if (Array.isArray(commands) && commands.includes(key)) {
    bot.command(key.toLowerCase(), commands[key]);
  }
}

bot.help((ctx) => ctx.reply('Its help))'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
