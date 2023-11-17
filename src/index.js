import axios from 'axios';
import 'dotenv/config';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);
const baseURL = 'http://sirius.inno-js.ru:3002';
let authToken = '';
let authStatus = false;

bot.telegram.setMyCommands([
  { command: 'start', description: 'это старт1' },
  { command: 'help', description: 'это помощь' },
  { command: 'allusers', description: 'получить всех пользователей' },
  { command: 'getuserbyid', description: 'получить пользователя по его id' },
  { command: 'reg', description: 'регистрация' },
]);

bot.start(async (ctx) => {
  await axios
    .post(baseURL + '/auth/login', {
      email: 'valerian_floppa',
      password: 'abc123',
    })
    .then((response) => {
      authToken = response.data.newAccessToken;
      authStatus = true;
      ctx.reply(
        `Доброго времени суток\n${ctx.from.first_name} вы успешно вошли в систему`
      );
    })
    .catch(() => ctx.reply('что-то пошло не так'));
});

bot.command('allusers', async (ctx) => {
  if (authToken !== '' && authStatus) {
    await axios
      .get(baseURL + '/users', {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      })
      .then((res) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
        );
      })
      .catch((err) => {
        authStatus = false;
      });
  } else {
    ctx.reply('нужно еще раз запустить команду start');
  }
});

bot.command('getuserbyid', (ctx) => {
  if (authToken !== '' && authStatus) {
    ctx.reply('введите id пользователя');
    bot.on('message', async (inputCTX) => {
      await axios
        .get(baseURL + `/user/${inputCTX.message.text}`, {
          headers: {
            Authorization: 'Bearer ' + authToken,
          },
        })
        .then((res) => {
          ctx.replyWithMarkdownV2(
            `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
          );
        })
        .catch((err) => {
          authStatus = false;
        });
    });
  } else {
    ctx.reply('нужно еще раз запустить команду start');
  }
});

bot.command('reg', (ctx) => {
  ctx.reply('Введите фио через пробел');
  ctx.session = {};
  ctx.session.step = 1;

  bot.on('message', async (inputCTX) => {
    switch (ctx.session.step) {
      case 1:
        ctx.session.fullName = inputCTX.message.text.split(' ');
        await ctx.reply('Отлично! Теперь введите почту:');
        ctx.session.step++;
        break;
      case 2:
        ctx.session.email = inputCTX.message.text;
        await ctx.reply('Хорошо! Теперь введите пароль:');
        ctx.session.step++;
        break;
      case 3:
        ctx.session.password = inputCTX.message.text;

        await axios
          .post(baseURL + '/auth/register', {
            email: ctx.session.email,
            lastname: ctx.session.fullName[0],
            firstname: ctx.session.fullName[1],
            middlename: ctx.session.fullName[2],
            password: ctx.session.password,
          })
          .then((res) => {
            authToken = res.data.newAccessToken;
            authStatus = true;
            ctx.reply('OK');
          })
          .catch((error) => {
            ctx.reply('Error');
          });

        ctx.session.step = 1;
        break;
      default:
        await ctx.reply('Что-то пошло не так. Попробуйте еще раз.');
        ctx.session.step = 1;
        break;
    }
  });
});

bot.help((ctx) => ctx.reply('Its help'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
