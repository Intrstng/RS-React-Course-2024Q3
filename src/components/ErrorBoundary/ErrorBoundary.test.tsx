import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import errorImg from '../../assets/error.png';

const MESSAGE_OK = 'No errors occurred';
const MESSAGE_ERROR = 'Some error occurred...';

describe('ErrorBoundary', () => {
  it('should render the error message when an error occurs', () => {
    const FaultyComponent = () => {
      throw new Error(MESSAGE_ERROR);
    };

    const { getByAltText, getByText } = render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>,
    );

    const imgElement = getByAltText('error');
    expect(imgElement).toBeInTheDocument();

    expect(imgElement).toHaveAttribute('src', errorImg);

    const errorMessage = getByText(MESSAGE_ERROR);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render the children when no error occurs', () => {
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
});
