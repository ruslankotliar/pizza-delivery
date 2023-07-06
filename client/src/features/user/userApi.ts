import { Avatar, User, UserApi } from '../../types';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import { getCookie } from '../../utils';

export const userApi: UserApi = {
  async getAvatar(): Promise<Avatar> {
    try {
      const jwt = getCookie('pizza-delivery-user-jwt');

      const response = await client.query({
        query: gql`
          query {
            userAvatar {
              avatar
            }
          }
        `,
        context: {
          headers: {
            authorization: jwt ? 'Bearer ' + jwt : null,
          },
        },
      });

      return response.data.userAvatar;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getUser(): Promise<User> {
    try {
      const response = await client.query({
        query: gql`
          query {
            userData {
              firstName
              lastName
              email
            }
          }
        `,
        context: {
          headers: {
            authorization: getCookie('pizza-delivery-user-jwt')
              ? 'Bearer ' + getCookie('pizza-delivery-user-jwt')
              : null,
          },
        },
      });

      return response.data.userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
