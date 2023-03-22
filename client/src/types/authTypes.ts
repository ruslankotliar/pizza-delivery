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

export interface LoginResponseData {
  id: string;
}

export interface RegistrationResponseData {
  id: string;
  avatar: string;
}

export interface AuthApi {
  googleLogin: (data: UserGoogleLoginData) => Promise<LoginResponseData>;
  login: (data: UserLoginData) => Promise<LoginResponseData>;
  register: (data: UserRegistrationData) => Promise<RegistrationResponseData>;
}
