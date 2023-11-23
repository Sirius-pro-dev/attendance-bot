import { Scenes } from 'telegraf';
import { joinToAttending } from './attending/index.js';
import { checkin } from './checkin/index.js';
import { login } from './login/index.js';
import { sendMessageByChatId } from './message/index.js';
import { deleteUserById, getUserById } from './users/index.js';

export const stage = new Scenes.Stage(
  [
    getUserById,
    checkin,
    joinToAttending,
    deleteUserById,
    login,
    sendMessageByChatId,
  ],
  {}
);
