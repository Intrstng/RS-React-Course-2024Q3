import React from 'react';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import PageLayout from '../page/layout';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { THEMES } from '../../contexts/Theme/Theme.config';


vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

(useRouter as vi.Mock).mockReturnValue({
  push: vi.fn(),
});

const mockSetCurrentTheme = vi.fn();
const mockThemeContextValue = {
  themeType: ThemeType.LIGHT,
  theme: THEMES[ThemeType.LIGHT],
  setCurrentTheme: mockSetCurrentTheme,
};

describe('PageLayout', () => {
  beforeEach(() => {
    (useSearchParams).mockReturnValue(new URLSearchParams({ search: 'test search' }));
  });

  test('should render children', () => {
    const { getByText } = render(
        <ThemeContext.Provider value={mockThemeContextValue}>
          <PageLayout>
            <div>Test component</div>
          </PageLayout>
        </ThemeContext.Provider>
    );

    expect(getByText(/test component/i)).toBeInTheDocument();
  });
});