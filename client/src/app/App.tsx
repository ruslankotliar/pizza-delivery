import React from 'react';

import { ConfigProvider } from 'antd';
import theme from '../theme';

import { MainRouter } from '../navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      >
        <Provider store={store}>
          <MainRouter />
        </Provider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
};

export default App;
