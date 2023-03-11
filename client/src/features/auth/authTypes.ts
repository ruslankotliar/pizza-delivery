import { UserLoginData, UserRegistrationData } from '../../types/authTypes';

export interface LoginResponseData {
  id: string;
  avatar: string;
}

export interface RegistrationResponseData {
  id: string;
  avatar: string;
}

export interface AuthApi {
  login: (data: UserLoginData) => Promise<LoginResponseData>;
  register: (data: UserRegistrationData) => Promise<RegistrationResponseData>;
}
