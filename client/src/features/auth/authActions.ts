import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginResponseData,
  UserLoginData,
  UserRegistrationData,
} from '../../types/authTypes';
import { setCookie } from '../../utils';
import { authApi } from './authApi';
import { setLogged, setLoading, setError, clearError } from './authSlice';

const finishAuth = (dispatch: any, data: LoginResponseData) => {
  setCookie('pizza-delivery-user-jwt', data.id, 30);
  setCookie('pizza-delivery-user-avatar', data.avatar, 30);
  dispatch(setLogged(true));
  dispatch(clearError());
};

export const register = createAsyncThunk(
  'auth/register',
  async (data: UserRegistrationData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.register(data);
      finishAuth(dispatch, response);
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: UserLoginData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.login(data);
      finishAuth(dispatch, response);
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
