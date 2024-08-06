import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeContextProps, ThemeType } from '../../contexts/Theme/Theme.model';
import { LOCAL_STORAGE_THEME_KEY, ThemeControl } from './ThemeControl';

describe('ThemeControl', () => {
  const mockSetCurrentTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  const renderWithThemeContext = () => {
    return render(
      <ThemeContext.Provider
        value={{ setCurrentTheme: mockSetCurrentTheme } as ThemeContextProps}
      >
        <ThemeControl />
      </ThemeContext.Provider>,
    );
  };

  test('should initialize theme from local storage', () => {
    window.localStorage.getItem.mockReturnValueOnce(
      JSON.stringify(ThemeType.DARK),
    );
    renderWithThemeContext();
    expect(mockSetCurrentTheme).toHaveBeenCalledWith(ThemeType.DARK);
  });

  test('should set light theme on light button click', () => {
    renderWithThemeContext();
    const lightButton = screen.getByText('Light');
    fireEvent.click(lightButton);
    expect(mockSetCurrentTheme).toHaveBeenCalledWith(ThemeType.LIGHT);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_THEME_KEY,
      JSON.stringify(ThemeType.LIGHT),
    );
  });

  test('should set dark theme on dark button click', () => {
    renderWithThemeContext();
    const darkButton = screen.getByText('Dark');
    fireEvent.click(darkButton);
    expect(mockSetCurrentTheme).toHaveBeenCalledWith(ThemeType.DARK);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_THEME_KEY,
      JSON.stringify(ThemeType.DARK),
    );
  });

  test('should call setCurrentTheme with default theme if localStorage is empty', () => {
    window.localStorage.getItem.mockReturnValueOnce(null);
    renderWithThemeContext();
    expect(mockSetCurrentTheme).toHaveBeenCalledWith('light');
  });
});
