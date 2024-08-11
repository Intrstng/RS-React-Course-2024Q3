import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { Search } from './Search';
import { useRouter, useSearchParams } from 'next/navigation';


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => new URLSearchParams()),
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

    (useSearchParams).mockReturnValue(new URLSearchParams({ search: 'test search' }));

    mockPush.mockClear();
    localStorage.removeItem('test');
    localStorage.clear();
  });

  test('renders the Search component', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Throw error on click')).toBeInTheDocument();
  });

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