import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLoginData, UserRegistrationData } from '../../types/authTypes';
import { setCookie } from '../../utils';
import { authApi } from './authApi';
import { setLogged, setLoading, setError, clearError } from './authSlice';

export const register = createAsyncThunk(
  'auth/register',
  async (data: UserRegistrationData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.register(data);
      setCookie('pizza-delivery-user', response.id, 30);
      dispatch(setLogged(true));
      dispatch(clearError());
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
      setCookie('pizza-delivery-user', response.id, 30);
      dispatch(setLogged(true));
      dispatch(clearError());
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
