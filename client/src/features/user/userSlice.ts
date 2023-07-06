import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  isLoading: boolean;
  error: string | null;
  avatar: string | null;
  user: User | null;
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  avatar: null,
  user: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
      },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError, setAvatar } =
  authSlice.actions;

export default authSlice.reducer;
