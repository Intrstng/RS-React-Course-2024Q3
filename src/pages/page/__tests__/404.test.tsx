import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Error404 from '../../404';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Error404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({
      replace: vi.fn(),
    });
  });

  test('should redirect to /error', () => {
    const replace = useRouter().replace;

    render(<Error404 />);

    expect(replace).toHaveBeenCalledWith('/error');
  });
});
