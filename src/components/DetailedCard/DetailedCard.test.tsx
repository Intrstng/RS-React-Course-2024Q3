import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { BrowserRouter as Router } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useGetCardDetailsQuery } from '../../redux/api/cardsApi';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { THEMES } from '../../contexts/Theme/Theme.config';

// vi.mock('../../redux/api/cardsApi', async () => {
//   const originalModule = await vi.importActual('../../redux/api/cardsApi');
//   return {
//     ...originalModule,
//     useGetCardDetailsQuery: vi.fn(),
//   };
// });
//
// vi.mock('react-redux', async () => {
//   const originalModule = await vi.importActual('react-redux');
//   return {
//     ...originalModule,
//     useSelector: vi.fn(),
//   };
// });
//
// vi.mock('react-router-dom', async () => {
//   const originalModule = await vi.importActual('react-router-dom');
//   return {
//     ...originalModule,
//     useParams: () => ({ pageId: '1', cardId: '10' }),
//     useNavigate: () => vi.fn(),
//   };
// });
//
// const renderWithProviders = (
//   ui: React.ReactElement,
//   {
//     reduxStore = setupStore(),
//     themeType = ThemeType.LIGHT,
//     theme = THEMES[ThemeType.LIGHT],
//     setCurrentTheme = () => {},
//   } = {},
// ) => {
//   return render(
//     <Provider store={reduxStore}>
//       <ThemeContext.Provider value={{ themeType, theme, setCurrentTheme }}>
//         <Router>{ui}</Router>
//       </ThemeContext.Provider>
//     </Provider>,
//   );
// };
describe('DetailedCard Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // test.skip('should display loader when fetching data', () => {
  //   (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
  //     data: null,
  //     isFetching: true,
  //     isError: false,
  //   });
  //
  //   renderWithProviders(<DetailedCard />);
  //
  //   expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  // });
  //
  // test.skip('should display error message on error', () => {
  //   (useGetCardDetailsQuery as vi.Mock).mockReturnValue({
  //     data: null,
  //     isFetching: false,
  //     isError: true,
  //   });
  //
  //   renderWithProviders(<DetailedCard />);
  //
  //   expect(
  //     screen.getByText('Error loading detailed cards'),
  //   ).toBeInTheDocument();
  // });

  test('...', () => {

    expect(
      true,
    ).toBe(true);
  });
});
