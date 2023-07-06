import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { setAvatar, setError, setUser } from './userSlice';

export const getUserAvatar = createAsyncThunk(
  'user/avatar',
  async (_, { dispatch }) => {
    try {
      const res = await userApi.getAvatar();
      console.log(res);
      dispatch(setAvatar(res.avatar));
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    }
  }
);

export const getUserData = createAsyncThunk(
  'user/data',
  async (_, { dispatch }) => {
    try {
      const res = await userApi.getUser();
      console.log(res);
      dispatch(setUser(res));
    } catch (error) {
      if (error instanceof Error) dispatch(setError(error.message));
    }
  }
);
