import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    userAvatar: AvatarResponse
    userData: UserDataResponse
  }

  type AvatarResponse {
    avatar: String
  }

  type UserDataResponse {
    firstName: String
    lastName: String
    email: String
  }
`;
