// import React from 'react';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { beforeEach, describe, expect, test, vi } from 'vitest';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { Search } from './Search';
// import { appReducer } from '../../redux/slices/appSlice';
// import { favoritesReducer } from '../../redux/slices/favoritesSlice';
// import { useRouter } from 'next/router';
//
// // Mock next/router
// vi.mock('next/router', () => ({
//   useRouter: vi.fn(),
// }));
//
// (useRouter as vi.Mock).mockReturnValue({
//   push: vi.fn(),
// });
//
// describe('Search Component', () => {
//   test('renders the Search component', () => {
//     render(<Search />);
//     expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
//   });
//
//   test('updates the input value on change', () => {
//     render(<Search />);
//     const input = screen.getByPlaceholderText('search');
//     fireEvent.change(input, { target: { value: 'test search' } });
//     expect(input).toHaveValue('test search');
//   });
//
//   test('navigates to the correct URL on form submit', () => {
//     render(<Search />);
//     const input = screen.getByPlaceholderText('search');
//     fireEvent.change(input, { target: { value: 'test search' } });
//     fireEvent.submit(screen.getByRole('form'));
//     expect(useRouter().push).toHaveBeenCalledWith('/page/1?search=test%20search');
//   });
//
//   test('throws an error when the "Throw error on click" button is clicked', () => {
//     render(<Search />);
//     const errorButton = screen.getByText('Throw error on click');
//     expect(() => fireEvent.click(errorButton)).toThrow(
//         "An error occurred when user clicked the 'Throw error on click' button",
//     );
//   });
// });


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { Search } from './Search';
import { useRouter } from 'next/navigation';


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Search', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });

    mockPush.mockClear();
    localStorage.clear();
  });

  test('renders the Search component', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Throw error on click')).toBeInTheDocument();
  });

  // it.skip('handles input change and updates localStorage', () => {
  //   render(<Search />);
  //   const input = screen.getByPlaceholderText('search') as HTMLInputElement;
  //
  //   fireEvent.change(input, { target: { value: 'test search' } });
  //
  //   expect(input.value).toBe('test search');
  //   expect(localStorage.getItem('LOCAL_STORAGE_SEARCH_KEY')).toBe(JSON.stringify('test search'));
  // });

  test('navigates to the correct URL on form submit', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.submit(screen.getByText(/Search/i));

    expect(mockPush).toHaveBeenCalledWith('/page/1?search=test search');
  });

  test('throws an error when the error button is clicked', () => {
    render(<Search />);
    const errorButton = screen.getByText('Throw error on click');

    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('An error occurred when user clicked the \'Throw error on click\' button');
  });
});