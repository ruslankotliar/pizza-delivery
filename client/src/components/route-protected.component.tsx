import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../consts';

export const ProtectedRoute = ({ children }: any) => {
  // use redux here
  if (false) {
    return <Navigate to={ROUTER_KEYS.USER_LOGIN} replace />;
  }

  return children || <Outlet />;
};
