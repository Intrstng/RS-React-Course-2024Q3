import React from 'react';
import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import errorImg from '../../assets/error-page.jpg';

const MESSAGE_OK = 'No errors occurred';
const MESSAGE_ERROR = 'Some error occurred...';

describe('ErrorBoundary', () => {
  // test('should render the error message when an error occurs', () => {
  //   const FaultyComponent = () => {
  //     throw new Error(MESSAGE_ERROR);
  //   };
  //
  //   const { getByAltText, getByText } = render(
  //     <ErrorBoundary>
  //       <FaultyComponent />
  //     </ErrorBoundary>,
  //   );
  //
  //   const imgElement = getByAltText('error');
  //   expect(imgElement).toBeInTheDocument();
  //
  //   expect(imgElement).toHaveAttribute('src', errorImg);
  //
  //   const errorMessage = getByText(MESSAGE_ERROR);
  //   expect(errorMessage).toBeInTheDocument();
  // });

  test('should render the children when no error occurs', () => {
    const TestComponent = () => <div>{MESSAGE_OK}</div>;
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    const testComponent = screen.getByText(MESSAGE_OK);
    expect(testComponent).toBeInTheDocument();

    const imgElement = screen.queryByAltText('error');
    expect(imgElement).not.toBeInTheDocument();

    const errorMessage = screen.queryByText(MESSAGE_ERROR);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('should refresh the page when the refresh button is clicked', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    const FaultyComponent = () => {
      throw new Error(MESSAGE_ERROR);
    };

    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(MESSAGE_ERROR)).toBeInTheDocument();

    const refreshButton = screen.getByText('Refresh page');
    expect(refreshButton).toBeInTheDocument();

    fireEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
