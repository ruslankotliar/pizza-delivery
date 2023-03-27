import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    me: LoginResponse
  }

  type RegisterResponse {
    id: ID!
    avatar: String!
  }

  type LoginResponse {
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
    avatar: Boolean!
  }

  type Mutation {
    register(input: RegisterInput!): RegisterResponse!
    login(input: LoginInput!): LoginResponse!
    googleLogin(input: GoogleLoginInput!): LoginResponse!
  }
`;
