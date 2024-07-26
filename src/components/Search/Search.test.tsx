import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Search } from './Search';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { AppRootState } from '../../redux/store';
import { cardsApi } from '../../redux/api/cardsApi';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, cardsReducer, favoritesReducer } from '../../redux/slices';

const LOCAL_STORAGE_KEY = 'searchValue';
const STORED_VALUE = 'Stored Vehicle';
const TEST_VALUE = 'Test Vehicle';

describe('Search Component', () => {
  let store: AppRootState;

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();

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
      [cardsApi.reducerPath]: cardsApi.reducer,
    };

    store = configureStore({
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

    cleanup();
  });

  test('should save the entered value to the local storage when Search button is clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );

    const input = screen.getByPlaceholderText('search');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: TEST_VALUE } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(`"${TEST_VALUE}"`);
    });
  });

  test('should retrieve the value from the local storage upon mounting', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(STORED_VALUE));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );

    const inputField = screen.getByPlaceholderText('search');
    expect(inputField).toHaveValue(STORED_VALUE);
  });
});
