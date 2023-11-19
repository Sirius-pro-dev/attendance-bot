import axios from 'axios';
import { config } from '../../config/index.js';

export const login = async (ctx) => {
  ctx.reply('Введите email:');
  ctx.session = {};
  ctx.session.step = 1;

  bot.on('message', async (inputCTX) => {
    switch (ctx.session.step) {
      case 1:
        ctx.session.email = inputCTX.message.text;
        await ctx.reply('Отлично! Теперь введите пароль:');
        ctx.session.step++;
        break;
      case 2:
        ctx.session.password = inputCTX.message.text;
        await axios
          .post(config.baseURL + '/auth/login', {
            email: ctx.session.email,
            password: ctx.session.password,
          })
          .then((response) => {
            config.authToken = response.data.newAccessToken;
            config.authStatus = true;
            ctx.reply(
              `Доброго времени суток\n${ctx.from.first_name} вы успешно вошли в систему`
            );
          })
          .catch((e) => ctx.reply('что-то пошло не так'));

        ctx.session.step = 1;
        break;
      default:
        await ctx.reply('Что-то пошло не так. Попробуйте еще раз.');
        ctx.session.step = 1;
        break;
    }
  });
};
