import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../constants';
import { RootState } from '../app/store';

export const ProtectedRoute = ({ children }: any) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  // use redux here
  if (!isLogged) {
    return <Navigate to={ROUTER_KEYS.USER_REGISTER} replace />;
  }

  return children || <Outlet />;
};
