/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from 'express';

import jsonwebtoken from 'jsonwebtoken';

import EnvVars from '../constants/EnvVars';
import { GraphQLError } from 'graphql';
import { RESPONSE_MESSAGE } from '../constants';

// **** Variables **** //

// Errors
const Errors = {
  ParamFalsey: 'Param is falsey',
  Validation: 'JSON-web-token validation failed.',
} as const;

// Options
const Options = {
  expiresIn: EnvVars.Jwt.Exp,
};

// **** Functions **** //

/**
 * Get session data from request object (i.e. ISessionUser)
 */

type JWT = {
  id: string;
  iat: number;
  exp: number;
};

async function getSessionData<T>(
  req: Request
): Promise<string | T | undefined> {
  try {
    const jwt = req.headers.authorization?.split(' ')[1];
    if (!jwt) return undefined;
    else return (await _decode<JWT>(jwt))?.id as string;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Add a JWT to the response
 */
async function addSessionData(
  res: Response,
  data: string | object
): Promise<string> {
  if (!res || !data) {
    throw new Error('Route error');
  }
  // Setup and return JWT
  return await _sign(data);
}

// **** Helper Functions **** //

/**
 * Encrypt data and return jwt.
 */
function _sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, EnvVars.Jwt.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || '');
    });
  });
}

/**
 * Decrypt JWT and extract client data.
 */
function _decode<T>(jwt: string): Promise<undefined | T> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, EnvVars.Jwt.Secret, (err, decoded) => {
      return err ? rej(Errors.Validation) : res(decoded as T);
    });
  });
}

// **** Export default **** //

export { addSessionData, getSessionData };
