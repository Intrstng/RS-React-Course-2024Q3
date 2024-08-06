import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { CustomToastify } from './CustomToastify';
import '@testing-library/jest-dom';
import { THEMES } from '../../contexts/Theme/Theme.config';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { describe, expect, test, vi } from 'vitest';
import { appReducer } from '../../redux/slices/appSlice';
import { cardsReducer } from '../../redux/slices/cardsSlice';
import { favoritesReducer } from '../../redux/slices/favoritesSlice';
import { mockCards, mockFavoritesCars } from '../../test/mockData';
import { cardsApi } from '../../redux/api/cardsApi';

URL['createObjectURL'] = vi.fn();

const themeContextValue = {
  themeType: ThemeType.DARK,
  theme: THEMES[ThemeType.DARK],
  setCurrentTheme: () => {},
};

describe('CustomToastify Component', () => {
  test('should toggle isToastifyOpen when Show/Hide is clicked', () => {
    const initialState = {
      app: {
        isLoading: false,
        error: null,
        currentPage: 1,
        isToastifyOpen: false,
      },
      cards: {
        domainCards: mockCards,
      },
      favorites: {
        favorites: mockFavoritesCars,
      },
      [cardsApi.reducerPath]: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {},
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
        favorites: favoritesReducer,
        [cardsApi.reducerPath]: cardsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware),
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    const showButton = screen.getByText(/Show/i);
    const hideButton = screen.queryByText(/Hide/i);
    const unselectAllButton = screen.queryByText(/Unselect all/i);

    expect(showButton).toBeInTheDocument();
    expect(hideButton).not.toBeInTheDocument();
    expect(unselectAllButton).not.toBeInTheDocument();

    fireEvent.click(showButton);

    expect(screen.getByText(/Hide/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Hide/i));

    expect(screen.getByText(/Show/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hide/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Unselect all/i)).not.toBeInTheDocument();
  });

  test('should change item selected alert text in CustomToastify', () => {
    const initialState = {
      app: {
        isLoading: false,
        error: null,
        currentPage: 1,
        isToastifyOpen: false,
      },
      cards: {
        domainCards: mockCards,
      },
      favorites: {
        favorites: { 19: mockFavoritesCars[19] },
      },
      [cardsApi.reducerPath]: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {},
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
        favorites: favoritesReducer,
        [cardsApi.reducerPath]: cardsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware),
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    const customToastifyAlertText = screen.getByText(/item selected/i);

    expect(customToastifyAlertText).toBeInTheDocument();
  });
});
