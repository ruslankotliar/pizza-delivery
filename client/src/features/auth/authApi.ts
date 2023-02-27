import { UserLoginData, UserRegistrationData } from '../../types/authTypes';
import {
  AuthApi,
  LoginResponseData,
  RegistrationResponseData,
} from './authTypes';
import { gql } from '@apollo/client';
import client from '../../api/graphql';

export const authApi: AuthApi = {
  async login(data: UserLoginData): Promise<LoginResponseData> {
    const response = await client.query({
      query: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
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
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await client.mutate({
      mutation: gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            token
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
          avatar: data.avatar ? data.avatar.name : undefined,
        },
      },
    });

    return response.data.register;
  },
};
