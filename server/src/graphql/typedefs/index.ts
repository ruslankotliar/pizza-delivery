import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    avatar: String!
  }

  type Query {
    me: User
  }

  type RegistrationResponse {
    user: User
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
    register(input: RegisterInput!): User!
    login(email: String!, password: String!): User!
  }
`;
