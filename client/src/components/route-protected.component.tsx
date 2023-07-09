import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../constants';
import { useAppSelector } from '../app/hooks';

export const ProtectedRoute = ({ children }: any) => {
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  // use redux here
  if (!isLogged) {
    return <Navigate to={ROUTER_KEYS.MAIN} replace />;
  }

  return children || <Outlet />;
};
