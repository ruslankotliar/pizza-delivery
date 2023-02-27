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
