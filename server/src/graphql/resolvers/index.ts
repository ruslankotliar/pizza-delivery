/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserModel } from '../../models/User';
import { AuthenticationError } from 'apollo-server-express';

import { User } from '../../types/user';
import { uploadUserAvatar } from '../../util/userAvatar';
import {
  Resolvers,
  RegisterArgs,
  MyRequest,
  MyContext,
} from '../../types/resolvers';

const signIn = (user: User, req: MyRequest) => {
  req.session.userId = user._id;

  return {
    id: user._id as string,
    avatar: user.avatar,
  };
};

export const resolvers: Resolvers = {
  Query: {
    me: async (_: Request, __: Response, { userId }: MyContext) => {
      if (!userId) {
        throw new AuthenticationError('Unauthorized');
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      return {
        id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
    },
  },
  Mutation: {
    register: async (_, { input }: RegisterArgs, { req }) => {
      const { firstName, lastName, email, password, confirmPassword, avatar } =
        input;
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = new UserModel({ firstName, lastName, email, password });

      if (avatar) {
        user.avatar = await uploadUserAvatar();
      } else {
        // generate random avatar here
        user.avatar = 'fasdfasd';
      }

      await user.save();

      return signIn(user, req as MyRequest);
    },

    login: async (_, args, { req }) => {
      const { email, password } = args;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await user.comparePassword(password);

      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      return signIn(user, req as MyRequest);
    },
  },
};
