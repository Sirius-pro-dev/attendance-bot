import axios from 'axios';
import { Scenes } from 'telegraf';
import { config } from '../../config/index.js';

export const checkin = new Scenes.WizardScene(
  'checkin',
  (ctx) => {
    ctx.reply('Введите фио через пробел');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.fullName = ctx.message.text.split(' ');
    ctx.reply('Отлично! Теперь введите почту:');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.email = ctx.message.text;
    ctx.reply('Хорошо! Теперь введите пароль:');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.password = ctx.message.text;

    axios
      .post(config.baseURL + '/auth/register', {
        email: ctx.wizard.state.email,
        lastname: ctx.wizard.state.fullName[0],
        firstname: ctx.wizard.state.fullName[1],
        middlename: ctx.wizard.state.fullName[2],
        password: ctx.wizard.state.password,
      })
      .then((res) => {
        config.authToken = res.data.newAccessToken;
        config.authStatus = true;
        ctx.reply('OK');
        ctx.scene.leave();
      })
      .catch((e) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(e.response.data, null, 2)}\n\`\`\``
        );
        ctx.scene.leave();
      });
  }
);
