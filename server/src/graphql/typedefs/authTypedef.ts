import { gql } from 'apollo-server-express';

export const authTypeDefs = gql`
  type AuthResponse {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input GoogleLoginInput {
    token: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
    avatar: String!
  }
`;
