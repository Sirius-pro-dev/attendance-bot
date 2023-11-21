import axios from 'axios';
import { config } from '../../config/index.js';

export const startHandler = async (ctx) => {
  await axios
    .post(config.baseURL + '/auth/login', {
      email: 'valerian_floppa',
      password: 'abc123',
    })
    .then((response) => {
      config.authToken = response.data.newAccessToken;
      config.authStatus = true;
      ctx.reply(
        `Доброго времени суток\n${ctx.from.first_name} вы успешно вошли в систему`
      );
    })
    .catch((e) => console.log(e) && ctx.reply('что-то пошло не так'));
};
