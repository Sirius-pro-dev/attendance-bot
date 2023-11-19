export const config = {
  baseURL: 'http://sirius.inno-js.ru:3002',
  authToken: '',
  authStatus: false,
  commandsList: [
    { command: 'start', description: 'это старт' },
    { command: 'help', description: 'это помощь' },
    { command: 'getallusers', description: 'получить всех пользователей' },
    { command: 'getuserbyid', description: 'получить пользователя по его id' },
    { command: 'checkin', description: 'регистрация' },
    { command: 'login', description: 'login' },
  ],
};
