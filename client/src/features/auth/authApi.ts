import {
  UserLoginData,
  UserRegistrationData,
  AuthApi,
  LoginResponseData,
  RegistrationResponseData,
  UserGoogleLoginData,
} from '../../types';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import axios from 'axios';

export const authApi: AuthApi = {
  async googleLogin(data: UserGoogleLoginData): Promise<LoginResponseData> {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation GoogleLogin($input: GoogleLoginInput!) {
            googleLogin(input: $input) {
              token
            }
          }
        `,
        variables: {
          input: data,
        },
      });

      return response.data.login;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async login(data: UserLoginData): Promise<LoginResponseData> {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: data,
        },
      });

      return response.data.login;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async register(
    data: UserRegistrationData
  ): Promise<RegistrationResponseData> {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              id
              avatar
            }
          }
        `,
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            avatar: !!data.avatar,
          },
        },
      });

      await axios.put(response.data.register.avatar, data.avatar, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      return response.data.register;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
