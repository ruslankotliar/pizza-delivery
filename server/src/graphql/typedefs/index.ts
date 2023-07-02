import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: AuthResponse
  }

  type AuthResponse {
    id: ID!
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

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    googleLogin(input: GoogleLoginInput!): AuthResponse!
  }
`;
