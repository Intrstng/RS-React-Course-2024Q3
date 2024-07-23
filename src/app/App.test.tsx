import React from 'react';
import { render, screen } from '@testing-library/react';
import { router } from '../routes/Route';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { ThemeProvider } from '../contexts/Theme/Theme.context';
import { App } from './App';

describe('App', () => {
  test('should render the search component with the router provider by root path', async () => {
    const themeContextValue = {
      theme: { backgroundColor: 'white', color: 'black' },
      setTheme: () => {},
    };
    render(
      <ThemeProvider value={themeContextValue}>
        <RouterProvider router={router} />
      </ThemeProvider>,
    );
    const input = await screen.findByPlaceholderText('search');
    const searchButton = await screen.findByText('Search');

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('should render App', () => {
    const themeContextValue = {
      theme: { backgroundColor: 'white', color: 'black' },
      setTheme: () => {},
    };
    render(
      <ThemeProvider value={themeContextValue}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>,
    );
    const appDiv = screen.getByTestId('app');
    expect(appDiv).toBeInTheDocument();
  });
});
