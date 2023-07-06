export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserGoogleLoginData {
  token: string;
}

export interface AuthResponseData {
  token: string;
}

export interface AuthApi {
  googleLogin: (data: UserGoogleLoginData) => Promise<AuthResponseData>;
  login: (data: UserLoginData) => Promise<AuthResponseData>;
  register: (data: UserRegistrationData) => Promise<AuthResponseData>;
}
