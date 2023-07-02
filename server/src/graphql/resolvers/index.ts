/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserModel } from '../../models/User';
import { AuthenticationError } from 'apollo-server-express';

import axios from 'axios';

import { User } from '../../types/user';
import { GoogleUserResponse } from '../../types/axios';

import {
  Resolvers,
  RegisterArgs,
  MyRequest,
  MyContext,
  LoginArgs,
  GoogleLoginArgs,
  AuthResponse,
} from '../../types/resolvers';

const signIn = (user: User, req: MyRequest) => {
  req.session.userId = user._id;

  return {
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
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          avatar,
        } = input;
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
          throw new Error('Email already registered');
        }

        const user = new UserModel({
          firstName,
          lastName,
          email,
          password,
          avatar,
        });

        await user.save();

        return signIn(user, req as MyRequest) as AuthResponse;
      } catch (error) {
        console.error(error);
      }
    },

    login: async (_, { input }: LoginArgs, { req }) => {
      try {
        const { email, password } = input;

        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
          throw new Error('Invalid email or password');
        }

        return signIn(user, req as MyRequest) as AuthResponse;
      } catch (error) {
        console.error(error);
      }
    },

    googleLogin: async (_, { input }: GoogleLoginArgs, { req }) => {
      const { token } = input;

      try {
        const { data: userInfo }: GoogleUserResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { email, given_name, family_name, picture } = userInfo;

        let user = await UserModel.findOne({ email });

        if (!user) {
          user = new UserModel({
            email,
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
          });
          await user.save();
        }

        return signIn(user, req as MyRequest) as AuthResponse;
      } catch (error) {
        console.error(error);
        throw new AuthenticationError('Invalid token');
      }
    },
  },
};
