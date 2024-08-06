import React from 'react';
import { Error404 } from './Error404';
import errorNotFound from '../../assets/error_404.png';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Error404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      push: vi.fn(),
    });
  });

  test('should render the error image', () => {
    const { getByAltText } = render(<Error404 />);

    const imgElement = getByAltText('error not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', errorNotFound);
  });

  test('renders and handles the redirect to home correctly', () => {
    const push = vi.fn();
    useRouter.mockImplementation(() => ({
      push,
    }));

    render(<Error404 />);

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);

    expect(push).toHaveBeenCalledWith('/');
  });

  test('should render the error image with correct alt text', () => {
    render(<Error404 />);

    const imgElement = screen.getByAltText('error not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', errorNotFound);
  });
});
