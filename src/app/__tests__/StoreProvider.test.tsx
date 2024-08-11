import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import StoreProvider from '../StoreProvider';

describe('StoreProvider', () => {
  test('should render children with the store', () => {
    const { getByText } = render(
      <StoreProvider>
        <div>Test component</div>
      </StoreProvider>,
    );

    expect(getByText(/Test component/i)).toBeInTheDocument();
  });
});
