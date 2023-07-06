import { Response } from 'express';
import { GraphQLError } from 'graphql';

import { RESPONSE_MESSAGE } from '../../constants';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

import { userEntity } from '../../entities';
import { getGoogleUserInfo } from '../../rest/google';
import {
  RegisterArgs,
  LoginArgs,
  GoogleLoginArgs,
  AuthResolverInterface,
} from '../../types';
import { authResponse } from '../../util';

export const authResolver: AuthResolverInterface = {
  register: async (_, { input }: RegisterArgs, { res }) => {
    const { firstName, lastName, email, password, confirmPassword, avatar } =
      input;

    if (password !== confirmPassword) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.PASSWORDS_NOT_MATCH, {
        extensions: { code: HttpStatusCodes.FORBIDDEN },
      });
    }

    const existingUser = await userEntity.findUserByEmail(email);

    if (existingUser) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.EMAIL_EXISTS, {
        extensions: { code: HttpStatusCodes.CONFLICT },
      });
    }

    const user = await userEntity.createUser({
      firstName,
      lastName,
      email,
      password,
      avatar,
    });

    return await authResponse(res as Response, String(user._id));
  },

  login: async (_, { input }: LoginArgs, { res }) => {
    const { email, password } = input;

    const user = await userEntity.findUserByEmail(email);

    if (!user) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.INVALID_CRED, {
        extensions: { code: HttpStatusCodes.UNAUTHORIZED },
      });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.INVALID_CRED, {
        extensions: { code: HttpStatusCodes.UNAUTHORIZED },
      });
    }

    return await authResponse(res as Response, String(user._id));
  },

  googleLogin: async (_, { input }: GoogleLoginArgs, { res }) => {
    const { email, given_name, family_name, picture } = await getGoogleUserInfo(
      input.token
    );

    const existingUser = await userEntity.findUserByEmail(email);

    if (existingUser) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.EMAIL_EXISTS, {
        extensions: { code: HttpStatusCodes.CONFLICT },
      });
    }

    const user = await userEntity.createUser({
      email,
      firstName: given_name,
      lastName: family_name,
      avatar: picture,
    });

    return await authResponse(res as Response, String(user._id));
  },
};
