import React from 'react';
import { Error404 } from './Error404';
import errorNotFound from '../../assets/error_404.png';
import { useRouteError, BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('react-router-dom', async () => {
  const original =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...original,
    useNavigate: vi.fn(),
    useRouteError: vi.fn(),
  };
});

describe('Error404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render the error image', () => {
    (useRouteError as vi.Mock).mockReturnValue(new Error('Test Error'));
    const { getByAltText } = render(<Error404 />);

    const imgElement = getByAltText('error not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', errorNotFound);
  });

  test('should log the error to the console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Test Error');
    (useRouteError as vi.Mock).mockReturnValue(mockError);
    render(<Error404 />);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });

  test('renders and handles the redirect to home correctly', () => {
    const navigate = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>,
    );

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
