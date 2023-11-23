import axios from 'axios';
import { Scenes } from 'telegraf';
import { config } from '../../config/index.js';

export const getAllMeetings = async (ctx) => {
  if (config.authToken !== '' && config.authStatus) {
    await axios
      .get(config.baseURL + '/meetings', {
        headers: {
          Authorization: 'Bearer ' + config.authToken,
        },
      })
      .then((res) => {
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``
        );
      })
      .catch((e) => {
        config.authStatus = false;
        ctx.replyWithMarkdownV2(
          `\`\`\`json\n${JSON.stringify(e.response.data, null, 2)}\n\`\`\``
        );
      });
  } else {
    ctx.reply('нужно еще раз запустить команду start');
  }
};
