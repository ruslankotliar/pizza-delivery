import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { ProtectedRoute } from '../components';
import { LayoutComponent } from '../layouts';

import { ROUTER_KEYS } from '../constants';
import routes from '../routes';

interface Component {
  element: React.FC<any>;
  path: string;
  protectedRoute: boolean;
  key: string;
}

export const MainRouter = () => (
  <Router>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
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
    </QueryParamProvider>
  </Router>
);
