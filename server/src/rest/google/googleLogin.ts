import axios from 'axios';

import { GOOGLE_API } from '../../constants';
import { GoogleUserResponse } from '../../types';

export const getGoogleUserInfo = async function (token: string) {
  const { data }: GoogleUserResponse = await axios.get(GOOGLE_API, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
