import { UserLoginData, UserRegistrationData } from '../../types/authTypes';
import {
  AuthApi,
  LoginResponseData,
  RegistrationResponseData,
} from './authTypes';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import axios from 'axios';

export const authApi: AuthApi = {
  async login(data: UserLoginData): Promise<LoginResponseData> {
    const response = await client.query({
      query: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user
          }
        }
      `,
      variables: {
        email: data.email,
        password: data.password,
      },
    });

    return response.data.login;
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
              firstName
              lastName
              email
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

      console.log(data.avatar);

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
