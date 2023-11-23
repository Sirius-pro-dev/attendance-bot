import axios from 'axios';
import { config } from '../../config/index.js';
import { Scenes } from 'telegraf';

export const login = new Scenes.WizardScene(
  'login',
  (ctx) => {
    ctx.reply('Введите email:');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.email = ctx.message.text;
    ctx.reply('Отлично! Теперь введите пароль:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.password = ctx.message.text;
    await axios
      .post(config.baseURL + '/auth/login', {
        email: ctx.wizard.state.email,
        password: ctx.wizard.state.password,
      })
      .then((response) => {
        config.authToken = response.data.newAccessToken;
        config.authStatus = true;
        ctx.reply(
          `Доброго времени суток\n${ctx.from.first_name} вы успешно вошли в систему`
        );
        return ctx.scene.leave();
      })
      .catch((e) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(e.response.data, null, 2)}\n\`\`\``
        );
        return ctx.scene.leave();
      });
  }
);
