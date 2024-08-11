import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useRouter } from 'next/navigation';
import Custom404 from '../not-found';


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Custom404', () => {
  test('renders the error image and home button', () => {
    useRouter.mockReturnValue({
      push: vi.fn(),
    });

    render(<Custom404 />);

    const errorImage = screen.getByAltText('error not found');
    expect(errorImage).toBeInTheDocument();

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
  });

  test('clicking the home button redirects to home page', () => {
    const pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    render(<Custom404 />);

    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});