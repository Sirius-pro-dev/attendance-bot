import axios from 'axios';
import { config } from '../../config/index.js';

export const getallusers = async (ctx) => {
  if (config.authToken !== '' && config.authStatus) {
    await axios
      .get(config.baseURL + '/users', {
        headers: {
          Authorization: 'Bearer ' + config.authToken,
        },
      })
      .then((res) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
        );
      })
      .catch(() => {
        config.authStatus = false;
        ctx.reply('back не отвечает');
      });
  } else {
    ctx.reply('нужно еще раз запустить команду start');
  }
};

export const getuserbyid = (ctx) => {
  if (authToken !== '' && authStatus) {
    ctx.reply('введите id пользователя');
    bot.on('message', async (inputCTX) => {
      await axios
        .get(config.baseURL + `/user/${inputCTX.message.text}`, {
          headers: {
            Authorization: 'Bearer ' + config.authToken,
          },
        })
        .then((res) => {
          ctx.replyWithMarkdownV2(
            `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
          );
        })
        .catch(() => {
          config.authStatus = false;
          ctx.reply('back не отвечает');
        });
    });
  } else {
    ctx.reply('нужно еще раз запустить команду start');
  }
};
