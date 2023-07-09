import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { setError, setUser } from './userSlice';

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
