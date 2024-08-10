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
import Page, { getServerSideProps } from '../card/[cardId]';
import { mockCardsInit } from '../../../../test/mockData';

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

describe('Page Component', () => {
  beforeEach(() => {
    (useRouter as vi.Mock).mockReturnValue({
      query: { cardId: '4' },
      push: vi.fn(),
    });
  });

  test('renders the card details when data is loaded', async () => {
    const data = mockCardsInit[0];

    renderWithProviders(<Page detailsData={data} />);

    await waitFor(() => {
      expect(screen.getByText(mockCardsInit[0].model)).toBeInTheDocument();
    });
  });

  test('calls getServerSideProps correctly', async () => {
    const context = {
      params: { cardId: '4' },
    } as unknown as GetServerSidePropsContext<{ cardId: string }>;

    const result = await getServerSideProps(context);

    expect(result).toHaveProperty('props');
    expect(result.props).toHaveProperty('detailsData');
  });
});
