import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import RootLayout from './RootLayout';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { THEMES } from '../../contexts/Theme/Theme.config';

const TEST_COMPONENT_CONTENT = 'Some test component content';

vi.mock('../Search/Search', () => ({
  Search: () => <div>Search Component</div>,
}));

vi.mock('../ThemeControl/ThemeControl', () => ({
  ThemeControl: () => <div>Theme Control Component</div>,
}));

describe('RootLayout', () => {
  const mockTheme = {
    themeType: ThemeType.LIGHT,
    theme: THEMES[ThemeType.LIGHT],
    setCurrentTheme: () => {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (children: React.ReactNode) => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <RootLayout>{children}</RootLayout>
      </ThemeContext.Provider>,
    );
  };

  test('should render children correctly', () => {
    renderWithTheme(<div>{TEST_COMPONENT_CONTENT}</div>);
    expect(screen.getByText(TEST_COMPONENT_CONTENT)).toBeInTheDocument();
  });

  test('should render ThemeControl and Search components', () => {
    renderWithTheme(<div>Test Children</div>);
    expect(screen.getByText('Theme Control Component')).toBeInTheDocument();
    expect(screen.getByText('Search Component')).toBeInTheDocument();
  });
});
