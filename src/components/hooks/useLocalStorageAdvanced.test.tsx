import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Search } from '../Search/Search';
import '@testing-library/jest-dom';
import { SearchContainerProps } from '../../types/types';

const mockFetchVehicles = vi.fn();
const mockSetAppError = vi.fn();

const searchProps: SearchContainerProps = {
  error: null,
  pagesCount: 3,
  isLoading: false,
  navigationPage: 2,
  fetchVehicles: mockFetchVehicles,
  setAppError: mockSetAppError,
};

const LOCAL_STORAGE_KEY = 'searchValue';
const TEST_VALUE = 'Test Vehicle';

describe('Search Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test('should save the entered value to the local storage on unmount of the component', async () => {
    await render(
      <BrowserRouter>
        <Search {...searchProps} />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('search');
    fireEvent.change(input, { target: { value: TEST_VALUE } });

    await render(
      <div>
        <h1>
          This component is rendered instead of the Search component. Search
          component is unmounted...
        </h1>
      </div>,
    );

    await waitFor(() => {
      expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(`"${TEST_VALUE}"`);
    });
  });
});
