import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { mockCards, mockFavoritesCars } from '../../test/mockData';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, cardsReducer, favoritesReducer } from '../../redux/slices';

URL['createObjectURL'] = vi.fn();

describe('CardList Component', () => {
  test.skip('should render the specified number of cards', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      cards: {
        domainCards: mockCards,
      },
      favorites: {
        favorites: mockFavoritesCars,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<CardList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockCards.length);
  });

  test.skip('should display no results message if no cards are present', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      cards: {
        domainCards: mockCards,
      },
      favorites: {
        favorites: mockFavoritesCars,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<CardList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    const message = screen.getByText(
      /No results were found for your request.../i,
    );
    expect(message).toBeVisible();
  });
});
