import { gql } from 'apollo-server-express';
import { userTypeDefs } from './userTypedef';
import { authTypeDefs } from './authTypedef';

export const typeDefs = gql`

  ${userTypeDefs}

  ${authTypeDefs}

  type Query {
    userAvatar: AvatarResponse
    userData: UserDataResponse
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse
    login(input: LoginInput!): AuthResponse
    googleLogin(input: GoogleLoginInput!): AuthResponse
  }

`;
