export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Avatar {
  avatar: string;
}

export interface UserApi {
  getAvatar: () => Promise<Avatar>;
  getUser: () => Promise<User>;
}
