import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserGoogleLoginData,
  UserLoginData,
  UserRegistrationData,
} from '../../types';
import { authApi } from './authApi';
import { setLoading, setError } from './authSlice';
import { finishAuth } from '../../utils';
import { AppDispatch } from '../../app/store';

export const register = createAsyncThunk(
  'auth/register',
  async (input: UserRegistrationData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await authApi.register(input);

      finishAuth(dispatch as AppDispatch, res.token);
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (input: UserLoginData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await authApi.login(input);

      finishAuth(dispatch as AppDispatch, res.token);
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (input: UserGoogleLoginData, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await authApi.googleLogin(input);

      finishAuth(dispatch as AppDispatch, res.token);
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
