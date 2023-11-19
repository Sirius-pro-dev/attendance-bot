import axios from 'axios';
import { config } from '../../config/index.js';

export const checkin = (ctx) => {
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
          .post(config.baseURL + '/auth/register', {
            email: ctx.session.email,
            lastname: ctx.session.fullName[0],
            firstname: ctx.session.fullName[1],
            middlename: ctx.session.fullName[2],
            password: ctx.session.password,
          })
          .then((res) => {
            config.authToken = res.data.newAccessToken;
            config.authStatus = true;
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
};
