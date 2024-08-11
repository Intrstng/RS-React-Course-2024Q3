import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import RootLayout from '../layout';

vi.mock('../contexts/Theme/Theme.context', () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock('./StoreProvider', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('RootLayout', () => {
  test('renders children correctly', () => {
    render(
        <RootLayout>
          <div>Test component</div>
        </RootLayout>
    );

    const childComponent = screen.getByText(/test component/i);
    expect(childComponent).toBeInTheDocument();
    expect(childComponent).toHaveTextContent(/test component/i);
  });
});