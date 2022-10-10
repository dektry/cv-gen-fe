import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import 'antd/dist/antd.css';

import 'antd/dist/antd.css';
import theme from 'theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
