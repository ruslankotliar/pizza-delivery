/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserModel } from '../../models/User';
import { AuthenticationError } from 'apollo-server-express';

import EnvVars from '../../constants/EnvVars';

import { User } from '../../types/user';
import { uploadUserAvatar } from '../../util';
import {
  Resolvers,
  RegisterArgs,
  MyRequest,
  MyContext,
  LoginArgs,
  RegisterResponse,
  LoginResponse,
  GoogleLoginArgs,
} from '../../types/resolvers';
import { OAuth2Client } from 'google-auth-library';

const signIn = (user: User, req: MyRequest, register: boolean) => {
  req.session.userId = user._id;

  return register
    ? {
        id: user._id,
        avatar: user.avatar,
      }
    : {
        id: user._id,
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

      return signIn(user, req as MyRequest, true) as RegisterResponse;
    },

    login: async (_, { input }: LoginArgs, { req }) => {
      const { email, password } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await user.comparePassword(password);

      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      return signIn(user, req as MyRequest, false) as LoginResponse;
    },

    googleLogin: async (_, { input }: GoogleLoginArgs, { req }) => {
      const { token } = input;

      const client = new OAuth2Client(EnvVars.Google.ClientID);

      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: EnvVars.Google.ClientID,
        });
        const { email } = ticket.getPayload();

        let user = await UserModel.findOne({ email });
        if (!user) {
          user = new UserModel({ email });
          await user.save();
        }

        return signIn(user, req as MyRequest, false) as LoginResponse;
      } catch (error) {
        throw new AuthenticationError('Invalid token');
      }
    },
  },
};
