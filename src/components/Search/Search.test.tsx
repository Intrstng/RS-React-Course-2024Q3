import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Search } from './Search';
import '@testing-library/jest-dom';
import { SearchContainerProps } from '../../shared/types/types';

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
const STORED_VALUE = 'Stored Vehicle';
const TEST_VALUE = 'Test Vehicle';

describe('Search Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test('should save the entered value to the local storage when Search button is clicked', async () => {
    render(
      <BrowserRouter>
        <Search {...searchProps} />
      </BrowserRouter>,
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
      <BrowserRouter>
        <Search {...searchProps} />
      </BrowserRouter>,
    );

    const inputField = screen.getByPlaceholderText('search');
    expect(inputField).toHaveValue(STORED_VALUE);
  });

  test('should call fetchVehicles with the local storage value upon mounting', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(STORED_VALUE));
    render(
      <BrowserRouter>
        <Search {...searchProps} />
      </BrowserRouter>,
    );

    expect(mockFetchVehicles).toHaveBeenCalledWith(
      STORED_VALUE,
      searchProps.navigationPage,
    );
  });
});
