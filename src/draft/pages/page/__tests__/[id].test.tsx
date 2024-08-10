import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import {
  appReducer,
  cardsReducer,
  favoritesReducer,
} from '../../../../redux/slices';
import { cardsApi } from '../../../../redux/api/cardsApi';
import Page, { getServerSideProps } from '../[id]';
import { mockCardsInit } from '../../../../test/mockData';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Page Component', () => {
  beforeEach(() => {
    (useRouter as vi.Mock).mockReturnValue({
      query: {},
      push: vi.fn(),
    });
  });

  test('renders the loader when loading', async () => {
    const initialState = {
      app: {
        isLoading: true,
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

    const data = {
      count: 30,
      next: '',
      previous: '',
      results: mockCardsInit,
    };

    renderWithProviders(<Page cardsData={data} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders the card list when data is loaded', async () => {
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

    const data = {
      count: 30,
      next: '',
      previous: '',
      results: mockCardsInit,
    };

    renderWithProviders(<Page cardsData={data} />);

    await waitFor(() => {
      expect(screen.getByText(mockCardsInit[0].name)).toBeInTheDocument();
    });
  });

  test('calls getServerSideProps correctly', async () => {
    const context = {
      params: { id: '1' },
      query: { search: 'test' },
    } as unknown as GetServerSidePropsContext<{ id: string }>;

    const result = await getServerSideProps(context);

    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('cardsData');
  });
});
