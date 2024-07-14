import React from 'react';
import { render, screen } from '@testing-library/react';
import { router } from './routes/Route';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

describe('App', () => {
  test('should render the search component with the router provider by root path', () => {
    render(<RouterProvider router={router} />);
    const input = screen.getByPlaceholderText('search');
    const searchButton = screen.getByText('Search');

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
