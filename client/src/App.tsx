import React from 'react';

import { ConfigProvider } from 'antd';
import theme from './theme';

import { MainRouter } from './navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './app/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <GoogleOAuthProvider clientId='805278311426-pr2htc30j3ln1kd95l4fhvv59iom0pl2.apps.googleusercontent.com'>
        <Provider store={store}>
          <MainRouter />
        </Provider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
};

export default App;
