import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ErrorWrapper from '../error';

const MESSAGE_ERROR = 'Some error occurred...';

describe('ErrorWrapper', () => {
  test('renders the error message and displays the error image', () => {
    const error = new Error(MESSAGE_ERROR);
    render(<ErrorWrapper error={error} />);

    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(screen.getByAltText('error')).toBeInTheDocument();
  });

  test('calls the handleRefresh function when the "Refresh page" button is clicked', () => {
    const error = new Error(MESSAGE_ERROR);

    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    render(<ErrorWrapper error={error} />);

    const refreshButton = screen.getByText('Refresh page');
    expect(refreshButton).toBeInTheDocument();

    fireEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});