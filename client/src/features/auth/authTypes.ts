import { UserLoginData, UserRegistrationData } from '../../types/authTypes';

export interface LoginResponseData {
  token: string;
}

export interface RegistrationResponseData {
  token: string;
}

export interface AuthApi {
  login: (data: UserLoginData) => Promise<LoginResponseData>;
  register: (data: UserRegistrationData) => Promise<RegistrationResponseData>;
}
