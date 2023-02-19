import React from 'react';

import { ConfigProvider } from 'antd';
import theme from './theme';

import { MainRouter } from './navigation';

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <MainRouter />
    </ConfigProvider>
  );
};

export default App;
