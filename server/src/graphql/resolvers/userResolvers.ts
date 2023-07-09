/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLError } from 'graphql';
import { Response } from 'express';

import { MyContext, UserResolverInterface } from '../../types';

import { RESPONSE_MESSAGE } from '../../constants';

import { userEntity } from '../../entities';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

export const userResolver: UserResolverInterface = {
  userData: async (_: Request, __: Response, { userId }: MyContext) => {
    if (!userId) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.NOT_AUTH, {
        extensions: { code: HttpStatusCodes.UNAUTHORIZED },
      });
    }

    const user = await userEntity.findUserById(userId);

    if (!user) {
      throw new GraphQLError(RESPONSE_MESSAGE.USER.FAIL.NOT_EXIST, {
        extensions: { code: HttpStatusCodes.UNAUTHORIZED },
      });
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    };
  },
};
