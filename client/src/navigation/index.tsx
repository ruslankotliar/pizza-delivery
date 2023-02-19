import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '../components';
import { LayoutComponent } from '../layouts';

import { ROUTER_KEYS } from '../consts';
import routes from '../routes';

interface Component {
  element: () => JSX.Element;
  path: string;
  protectedRoute: boolean;
  key: string;
}

export const MainRouter = () => (
  <Router>
    <LayoutComponent>
      <Routes>
        {routes.map((route: Component) => {
          const { element: Component, path, protectedRoute, key } = route;
          return protectedRoute ? (
            <Route key={key} element={<ProtectedRoute />}>
              <Route
                element={<Component />}
                path={ROUTER_KEYS[path as keyof typeof ROUTER_KEYS]}
              />
            </Route>
          ) : (
            <Route
              key={key}
              element={<Component />}
              path={ROUTER_KEYS[path as keyof typeof ROUTER_KEYS]}
            />
          );
        })}
      </Routes>
    </LayoutComponent>
  </Router>
);
