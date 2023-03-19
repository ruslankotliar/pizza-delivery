import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils';

interface AuthState {
  isLoading: boolean;
  isLogged: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLogged: Boolean(getCookie('pizza-delivery-user-jwt')),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
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

export const { setLogged, setLoading, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
