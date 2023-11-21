export const config = {
  baseURL: 'http://sirius.inno-js.ru:3002',
  authToken: '',
  authStatus: false,
  commandsList: [
    { command: 'start', description: 'это старт' },
    { command: 'help', description: 'это помощь' },
    {
      command: 'getAllUsers'.toLowerCase(),
      description: 'получить всех пользователей',
    },
    {
      command: 'getUserById'.toLowerCase(),
      description: 'получить пользователя по его id',
    },
    { command: 'checkin', description: 'регистрация' },
    { command: 'login', description: 'login' },
    {
      command: 'getAllAttendings'.toLowerCase(),
      description: 'получить все посещения',
    },
    {
      command: 'joinToAttending'.toLowerCase(),
      description: 'присоединиться к встрече',
    },
    {
      command: 'getAllMeetings'.toLowerCase(),
      description: 'получить все встречи',
    },
    {
      command: 'deleteUserById'.toLowerCase(),
      description: 'удалить пользователя по id',
    },
  ],
};
