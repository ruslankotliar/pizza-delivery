import { Response } from 'express';

import { addSessionData } from './SessionUtil';
import { AuthResponse } from '../types';

export const authResponse = async (
  res: Response,
  tokenData: string
): Promise<AuthResponse> => {
  const token = await addSessionData(res, {
    id: tokenData,
  });

  return { token };
};
