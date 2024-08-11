import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Loading', () => {
  test('renders the loading spinner and "Loading..." text', () => {
    render(<Loading />);
    const loadingSpinner = screen.getByAltText('loading');
    const loadingText = screen.getByText('Loading...');

    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
