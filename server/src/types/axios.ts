import { AxiosResponse } from 'axios';
import { GoogleUser } from './user';

interface GoogleUserResponse extends AxiosResponse {
  data: GoogleUser;
}

export { GoogleUserResponse };
