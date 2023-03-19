import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type UserResponse {
    id: ID!
  }

  type Query {
    me: UserResponse
  }

  input LoginInput {
    email: String!
    password: String!
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
    register(input: RegisterInput!): UserResponse!
    login(input: LoginInput!): UserResponse!
  }
`;
