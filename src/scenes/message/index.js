import { Scenes } from 'telegraf';

export const sendMessageByChatId = new Scenes.WizardScene(
  'sendMessageByChatId',
  (ctx) => {
    ctx.reply('Введите id чата в который вы хотите передать сообщение');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.chatId = ctx.message.text;
    ctx.reply('Введите текст сообщения которое вы хотите отправить');
    ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.message = ctx.message.text;
    ctx.telegram.sendMessage(ctx.wizard.state.chatId, ctx.wizard.state.message);
    ctx.scene.leave();
  }
);
