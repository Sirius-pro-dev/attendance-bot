export const getChatId = (ctx) => {
  ctx.reply(ctx.chat.id.toString());
};
