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
import { UPLOAD_AVATAR } from '../../consts';

export const authApi: AuthApi = {
  async googleLogin(data: UserGoogleLoginData): Promise<LoginResponseData> {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation GoogleLogin($input: GoogleLoginInput!) {
            googleLogin(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: data,
        },
      });

      return response.data.googleLogin;
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
      let avatar = 'default url'; // default, change later

      if (data.avatar) {
        const formData = new FormData();
        formData.append('image', data.avatar);

        const response = await axios.post(UPLOAD_AVATAR, formData);
        avatar = response.data;
      }

      const response = await client.mutate({
        mutation: gql`
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: { ...data, avatar },
        },
      });

      return response.data.register;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
