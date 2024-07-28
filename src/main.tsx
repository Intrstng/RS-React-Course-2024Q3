import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './routes/Route';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/Theme/Theme.context';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </ThemeProvider>,
);
