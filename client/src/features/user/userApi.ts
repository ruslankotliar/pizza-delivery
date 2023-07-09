import { User, UserApi } from '../../types';
import { gql } from '@apollo/client';
import client from '../../api/graphql';
import { getCookie } from '../../utils';

export const userApi: UserApi = {
  async getUser(): Promise<User> {
    try {
      const response = await client.query({
        query: gql`
          query {
            userData {
              firstName
              lastName
              email
              avatar
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
