import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { Error404 } from '../components/Error404/Error404';
import { CardList } from '../components/CardList/CardList';
import { DetailsPage } from '../components/DetailsPage/DetailsPage';

export const PATH = {
  PAGE_ROOT: '/',
  CARD_LIST: '/page/:pageId',
  DETAILS_PAGE: '/page/:pageId/card/:cardId',
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
        element: <Navigate to={PATH.CARD_LIST} />,
      },
      {
        path: PATH.CARD_LIST,
        element: <CardList />,
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
