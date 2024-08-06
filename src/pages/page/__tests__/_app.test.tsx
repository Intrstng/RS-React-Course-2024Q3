import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../_app';
import { wrapper } from '../../../redux/store';

const TITLE = 'RS School Next.js Task';
const TEST_COMPONENT_CONTENT = 'Some test component content';

vi.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

vi.mock('../../../redux/store', () => ({
  wrapper: {
    useWrappedStore: vi.fn(),
  },
}));

describe('App', () => {
  const mockStore = {
    getState: vi.fn(),
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper.useWrappedStore.mockReturnValue({ store: mockStore });
  });

  test('should render the App component with the correct structure', () => {
    const TestComponent = () => <div>{TEST_COMPONENT_CONTENT}</div>;
    const pageProps = {};

    render(<App Component={TestComponent} pageProps={pageProps} />);

    expect(document.title).toBe(TITLE);
    expect(screen.getByText(TEST_COMPONENT_CONTENT)).toBeInTheDocument();
  });
});
