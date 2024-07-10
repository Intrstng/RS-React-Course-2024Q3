import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { Error404 } from '../components/Error404/Error404';
import { MainPage } from '../components/MainPage/MainPage';
import { DetailsPage } from '../components/DetailsPage/DetailsPage';

export const PATH = {
  PAGE_ROOT: '/',
  MAIN_PAGE: '/page/:pageId',
  DETAILS_PAGE: '/page/:pageId/vehicle/:vehicleId',
  PAGE_ERROR: '/error',
} as const;

export const router = createBrowserRouter([
  {
    path: PATH.PAGE_ROOT,
    element: <App />,
    errorElement: <Navigate to={PATH.PAGE_ERROR} />,
    children: [
      {
        index: true,
        element: <Navigate to={PATH.MAIN_PAGE} />,
      },
      {
        path: PATH.MAIN_PAGE,
        element: <MainPage />,
        children: [
          {
            path: PATH.DETAILS_PAGE,
            element: <DetailsPage />,
          },
        ],
      },
      {
        path: PATH.PAGE_ERROR,
        element: <Error404 />,
      },
    ],
  },
]);
