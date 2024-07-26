import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Pagination } from './Pagination';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer, cardsReducer } from '../../redux/slices';
import { mockCards } from '../../test/mockData';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

let START_PAGE: number;

describe('Pagination', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render and handle Next page pagination correctly', () => {
    START_PAGE = 1;
    const initialState = {
      app: {
        currentPage: START_PAGE,
      },
      cards: {
        domainCards: mockCards,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    const updatedState = store.getState();
    expect(updatedState.app.currentPage).toBe(START_PAGE + 1);
  });

  test('should render and handle Prev page pagination correctly', () => {
    START_PAGE = 2;
    const initialState = {
      app: {
        currentPage: START_PAGE,
      },
      cards: {
        domainCards: mockCards,
      },
    };

    const store = configureStore({
      reducer: {
        app: appReducer,
        cards: cardsReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(prevButton);

    const updatedState = store.getState();
    expect(updatedState.app.currentPage).toBe(START_PAGE - 1);
  });
});
