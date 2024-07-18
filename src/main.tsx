import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './routes/Route';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/Theme/Theme.context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />,
  </ThemeProvider>,
);
