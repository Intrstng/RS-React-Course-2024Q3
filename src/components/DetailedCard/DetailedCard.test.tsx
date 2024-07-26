import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import * as reactRouterDom from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, afterEach, test, vi, expect } from 'vitest';
import { useGetCardDetailsQuery } from '../../redux/api/cardsApi';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { THEMES } from '../../contexts/Theme/Theme.config';
import { mockCards } from '../../test/mockData';

vi.mock('../../redux/api/cardsApi', async () => {
  const originalModule = await vi.importActual('../../redux/api/cardsApi');
  return {
    ...originalModule,
    useGetCardDetailsQuery: vi.fn(),
  };
});

vi.mock('react-redux', async () => {
  const originalModule = await vi.importActual('react-redux');
  return {
    ...originalModule,
    useSelector: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useParams: () => ({ pageId: '1', cardId: '10' }),
    useNavigate: () => vi.fn(),
  };
});

const renderWithProviders = (
  ui: React.ReactElement,
  {
    reduxStore = store,
    themeType = ThemeType.LIGHT,
    theme = THEMES[ThemeType.LIGHT],
    setCurrentTheme = () => {},
  } = {},
) => {
  return render(
    <Provider store={reduxStore}>
      <ThemeContext.Provider value={{ themeType, theme, setCurrentTheme }}>
        <Router>{ui}</Router>
      </ThemeContext.Provider>
    </Provider>,
  );
};
describe('DetailedCard Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should display loader when fetching data', () => {
    (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    });

    renderWithProviders(<DetailedCard />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display error message on error', () => {
    (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
    });

    renderWithProviders(<DetailedCard />);

    expect(
      screen.getByText('Error loading detailed cards'),
    ).toBeInTheDocument();
  });

  test('should display card details when data is fetched', () => {
    (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
      data: mockCards[0],
      isFetching: false,
      isError: false,
    });

    renderWithProviders(<DetailedCard />);

    expect(screen.getByText('Model:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].model)).toBeInTheDocument();
    expect(screen.getByText('Manufacturer:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].manufacturer)).toBeInTheDocument();
    expect(screen.getByText('Length:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].length)).toBeInTheDocument();
    expect(screen.getByText('Crew:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].crew)).toBeInTheDocument();
    expect(screen.getByText('Passengers:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].passengers)).toBeInTheDocument();
    expect(screen.getByText('Consumables:')).toBeInTheDocument();
    expect(screen.getByText(mockCards[0].consumables)).toBeInTheDocument();
  });

  test('should navigate to previous page on clicking outside the details component', () => {
    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
      data: mockCards[0],
      isFetching: false,
      isError: false,
    });

    renderWithProviders(<DetailedCard />);

    fireEvent.mouseDown(document);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  test('should navigate to previous page on form submission', async () => {
    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(mockNavigate);

    (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
      data: mockCards[0],
      isFetching: false,
      isError: false,
    });

    renderWithProviders(<DetailedCard />);

    const button = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
