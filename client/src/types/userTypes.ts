export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface UserApi {
  getUser: () => Promise<User>;
}
