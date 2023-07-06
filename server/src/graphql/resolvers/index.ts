import { Resolvers } from '../../types';

import { authResolver } from './authResolvers';
import { userResolver } from './userResolvers';

export const resolvers: Resolvers = {
  Query: {
    ...userResolver,
  },
  Mutation: {
    ...authResolver,
  },
};
