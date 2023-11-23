import axios from 'axios';
import { Scenes } from 'telegraf';
import { config } from '../../config/index.js';

export const joinToAttending = new Scenes.WizardScene(
  'joinToAttending',
  (ctx) => {
    ctx.reply('Введите id встречи');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.meetingID = ctx.message.text;
    ctx.reply('Хорошо! Теперь введите id пользователя:');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.studentID = ctx.message.text;

    axios
      .post(
        config.baseURL + '/attending',
        {
          meetingId: ctx.wizard.state.meetingID,
          studentId: ctx.wizard.state.studentID,
        },
        {
          headers: {
            Authorization: 'Bearer ' + config.authToken,
          },
        }
      )
      .then((res) => {
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
