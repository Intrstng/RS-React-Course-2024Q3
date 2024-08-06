import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Custom404 from '../../error';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe('Custom404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      push: vi.fn(),
    });
  });

  test('should render the error image with correct alt text', () => {
    render(<Custom404 />);

    const imgElement = screen.getByAltText('error not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', 'error not found');
  });

  test('should render the Home button', () => {
    render(<Custom404 />);

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
  });

  test('should redirect to home when the Home button is clicked', () => {
    const push = useRouter().push;

    render(<Custom404 />);

    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    expect(push).toHaveBeenCalledWith('/');
  });
});
