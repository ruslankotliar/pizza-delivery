import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type UserDataResponse {
    firstName: String
    lastName: String
    email: String
    avatar: String
  }
`;
