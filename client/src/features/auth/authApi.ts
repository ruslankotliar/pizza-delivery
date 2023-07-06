import {
  UserLoginData,
  UserRegistrationData,
  AuthApi,
  UserGoogleLoginData,
  AuthResponseData,
} from '../../types';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import axios from 'axios';
import { UPLOAD_AVATAR } from '../../constants';

export const authApi: AuthApi = {
  async googleLogin(data: UserGoogleLoginData): Promise<AuthResponseData> {
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

      return response.data.googleLogin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async login(data: UserLoginData): Promise<AuthResponseData> {
    try {
      const response = await client.mutate({
        mutation: gql`
          mutation Login($input: LoginInput!) {
            login(input: $input) {
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

  async register(data: UserRegistrationData): Promise<AuthResponseData> {
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
              token
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
