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
import { mockCards } from '../../test/mockData';
import { VehicleDetailsDomain } from '../../shared/types/types';
import { appReducer } from '../../redux/slices/appSlice';
import { favoritesReducer } from '../../redux/slices/favoritesSlice';

URL['createObjectURL'] = vi.fn();

const themeContextValue = {
  themeType: ThemeType.DARK,
  theme: THEMES[ThemeType.DARK],
  setCurrentTheme: () => {},
};

describe('CustomToastify', () => {
  test('renders the component with no favorites', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      favorites: {
        favoriteCards: [] as VehicleDetailsDomain[],
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    expect(screen.queryByText(/favorites/i)).not.toBeInTheDocument();
  });

  test('renders the component with favorites', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      favorites: {
        favoriteCards: mockCards,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockCards.length}`)).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCards[1].name)).toBeInTheDocument();
  });

  test('toggles the favorites list', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      favorites: {
        favoriteCards: mockCards,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    expect(screen.getByText(/hide/i)).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCards[1].name)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide'));
    expect(screen.getByText(/show/i)).toBeInTheDocument();
    expect(screen.queryByText(mockCards[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockCards[1].name)).not.toBeInTheDocument();
  });

  test('clears the favorites list', () => {
    const initialState = {
      app: {
        isToastifyOpen: true,
      },
      favorites: {
        favoriteCards: mockCards,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        favorites: favoritesReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContextValue}>
          <CustomToastify />
        </ThemeContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(screen.queryByText(mockCards[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockCards[1].name)).not.toBeInTheDocument();
    expect(screen.queryByText(/favorites/i)).not.toBeInTheDocument();
  });
});
