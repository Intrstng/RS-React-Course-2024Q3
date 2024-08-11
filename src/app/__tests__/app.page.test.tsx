import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useRouter, usePathname } from 'next/navigation';
import Home from '../page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

(useRouter as vi.Mock).mockReturnValue({
  replace: vi.fn(),
});
(usePathname as vi.Mock).mockReturnValue('/');

describe('Home', () => {
  test('should render the App component', () => {
    render(<Home />);
    expect(
      screen.getByText(/Welcome to RS School Next.js App Routing/i),
    ).toBeInTheDocument();
  });
});
