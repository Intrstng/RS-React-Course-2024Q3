import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  currentPageSelector,
  searchSelector,
  statusSelector,
} from '../redux/selectors/appSelectors';
import { appActions } from '../redux/slices/appSlice';
import App from './App';

vi.mock('../redux/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../components/Loader/Loader', () => ({
  Loader: () => <div>Loading...</div>,
}));

vi.mock('../components/CardList/CardList', async () => {
  const originalModule = await vi.importActual(
    '../components/CardList/CardList',
  );
  return {
    ...originalModule,
    default: () => <div>Card List</div>,
  };
});

describe('App', () => {
  const mockDispatch = vi.fn();
  const mockRouter = {
    query: { id: '1' },
    pathname: '/',
    replace: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as vi.Mock).mockImplementation((selector) => {
      if (selector === currentPageSelector) return 1;
      if (selector === statusSelector) return false;
      if (selector === searchSelector) return '';
      return null;
    });
    (useRouter as vi.Mock).mockReturnValue(mockRouter);
  });

  test('should render Loader when isLoading is true', () => {
    (useAppSelector as vi.Mock).mockImplementation((selector) => {
      if (selector === statusSelector) return true;
      return null;
    });

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render CardList when isLoading is false', () => {
    render(<App />);
    expect(screen.getByText('Card List')).toBeInTheDocument();
  });

  test('should dispatch setAppCurrentPage action on mount', () => {
    render(<App />);
    expect(mockDispatch).toHaveBeenCalledWith(
      appActions.setAppCurrentPage({ currentPage: 1 }),
    );
  });

  test('should replace the router path when pathname is "/"', () => {
    render(<App />);
    expect(mockRouter.replace).toHaveBeenCalledWith(
      {
        pathname: `/page/1`,
        query: { search: '' },
      },
      undefined,
      { shallow: true },
    );
  });
});
