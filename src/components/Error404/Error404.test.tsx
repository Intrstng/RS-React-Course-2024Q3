import React from 'react';
import { render } from '@testing-library/react';
import { Error404 } from './Error404';
import errorNotFound from '../../assets/error_404.png';
import { useRouteError } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useRouteError: vi.fn(),
}));

describe('Error404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the error image', () => {
    (useRouteError as vi.Mock).mockReturnValue(new Error('Test Error'));
    const { getByAltText } = render(<Error404 />);

    const imgElement = getByAltText('error not found');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', errorNotFound);
  });

  it('should log the error to the console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Test Error');
    (useRouteError as vi.Mock).mockReturnValue(mockError);
    render(<Error404 />);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });
});
