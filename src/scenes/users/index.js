import axios from 'axios';
import { Scenes } from 'telegraf';
import { config } from '../../config/index.js';

export const getUserById = new Scenes.WizardScene(
  'getUserById',
  (ctx) => {
    if (config.authToken !== '' && config.authStatus) {
      ctx.reply('введите id пользователя');
      ctx.wizard.next();
    } else {
      ctx.reply('нужно еще раз запустить команду start');
      ctx.scene.leave();
    }
  },
  (ctx) => {
    axios
      .get(config.baseURL + `/user/${ctx.message.text}`, {
        headers: {
          Authorization: 'Bearer ' + config.authToken,
        },
      })
      .then((res) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
        );
        ctx.scene.leave();
      })
      .catch(() => {
        config.authStatus = false;
        ctx.reply('back не отвечает');
        ctx.scene.leave();
      });
  }
);

export const deleteUserById = new Scenes.WizardScene(
  'deleteUserById',
  async (ctx) => {
    ctx.reply('Введите id пользователя');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.userId = ctx.message.text;

    axios
      .delete(config.baseURL + `/user/${ctx.wizard.state.userId}`, {
        headers: {
          Authorization: 'Bearer ' + config.authToken,
        },
      })
      .then((res) => {
        ctx.reply('OK');
        ctx.scene.leave();
      })
      .catch((error) => {
        ctx.reply('Что-то пошло не так. Попробуйте еще раз.');
        ctx.scene.leave();
      });
  }
);
