import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../myApp/App';

export const PATH = {
  PAGE_ROOT: '/',
  CARD_LIST: '/page/:pageId',
  DETAILED_CARD: '/page/:pageId/card/:cardId',
  PAGE_ERROR: '/error',
} as const;

export const router = createBrowserRouter([
  {
    path: PATH.PAGE_ROOT,
    element: <App />,
    errorElement: <Navigate to={PATH.PAGE_ERROR} />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to={PATH.CARD_LIST} />,
      // },
      // {
      //   path: PATH.CARD_LIST,
      //   element: <CardList />,
      //   children: [
      //     {
      //       path: PATH.DETAILED_CARD,
      //       element: <DetailedCard />,
      //     },
      //   ],
      // },
      // {
      //   path: PATH.PAGE_ERROR,
      //   element: <Error404 />,
      // },
    ],
  },
]);
