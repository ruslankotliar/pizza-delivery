import {
  UserLoginData,
  UserRegistrationData,
  AuthApi,
  LoginResponseData,
  RegistrationResponseData,
} from '../../types/authTypes';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import axios from 'axios';

export const authApi: AuthApi = {
  async login(data: UserLoginData): Promise<LoginResponseData> {
    try {
      console.log(data);
      const response = await client.mutate({
        mutation: gql`
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              id
              avatar
            }
          }
        `,
        variables: {
          input: {
            email: data.email.toString(),
            password: data.password.toString(),
          },
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
