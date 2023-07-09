import { AppDispatch } from '../app/store';
import { clearError, setError, setLogged } from '../features/auth/authSlice';
import { setCookie } from './cookies';

const finishAuth = (dispatch: AppDispatch, token: string) => {
  setCookie('pizza-delivery-user-jwt', token, 30);
  dispatch(setLogged(true));
  dispatch(clearError());
};

// const checkError = (dispatch: AppDispatch, res: ErrorResponseData) => {
//   if (res.status === 'error') dispatch(setError(res.message));
// };

export { finishAuth };
