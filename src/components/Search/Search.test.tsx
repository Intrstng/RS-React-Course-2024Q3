import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Search } from './Search';
import { appReducer } from '../../redux/slices/appSlice';
import { cardsReducer } from '../../redux/slices/cardsSlice';
import { favoritesReducer } from '../../redux/slices/favoritesSlice';
import { cardsApi } from '../../redux/api/cardsApi';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const initialState = {
  app: {
    isLoading: false,
    error: null,
    currentPage: 1,
    isToastifyOpen: true,
  },
  cards: {
    domainCards: [],
  },
  favorites: {
    favorites: [],
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

const renderWithProviders = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Search Component', () => {
  beforeEach(() => {
    (useRouter as vi.Mock).mockReturnValue({
      query: {},
      push: vi.fn(),
    });
  });

  test('renders the search input and buttons', () => {
    renderWithProviders(<Search />);
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Throw error on click' }),
    ).toBeInTheDocument();
  });

  test('updates the search input value', async () => {
    renderWithProviders(<Search />);
    const input = screen.getByPlaceholderText('search');
    await userEvent.type(input, 'test search');
    expect(input).toHaveValue('test search');
  });

  test('throws an error when the "Throw error on click" button is clicked', async () => {
    renderWithProviders(<Search />);
    const errorButton = screen.getByRole('button', {
      name: 'Throw error on click',
    });

    await expect(async () => {
      fireEvent.click(errorButton);
      await waitFor(() => {
        expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
      });
    }).rejects.toThrow();
  });
});
