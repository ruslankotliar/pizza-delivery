const ROUTER_KEYS = {
  MAIN: '/',
  MENU: '/menu?filter=',
  USER_REGISTER: '/register',
  USER_PROFILE: '/profile'
};

const NAV_KEYS = [
  {
    label: 'MENU',
    key: 'pizzas',
  },
  {
    label: 'DEALS',
    key: 'deals',
  },
];

const ABOUT_ME = {
  name: 'Ruslan Kotliarenko',
  linkedIn: 'https://www.linkedin.com/in/ruslan-kotliarenko',
  gitHub: 'https://github.com/ruslankotliar',
};

const UPLOAD_AVATAR = 'http://localhost:4000/uploadAvatar';

export { ROUTER_KEYS, ABOUT_ME, NAV_KEYS, UPLOAD_AVATAR };
