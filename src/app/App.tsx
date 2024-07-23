import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import './App.css';
import { Search } from '../components/Search/Search';
import { Vehicle } from '../types/types';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { fetchVehiclesThunks } from '../components/bll/vehiclesThunks';
import { Loader } from '../components/Loader/Loader';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../routes/Route';
import { ThemeContext } from '../contexts/Theme/Theme.context';
import { ThemeControl } from '../components/ThemeControl/ThemeControl';
import { useGetCardsQuery } from '../redux/api/cardsApi';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { currentPageSelector } from '../redux/selectors/appSelectors';
import { appActions } from '../redux/slices/appSlice';

export const App = () => {
  const { theme } = useContext(ThemeContext);
  const [cards, setCards] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const maxPagesQuantity = Math.ceil(recordsCount / 10);

  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const pageFromParams = parseInt(pageId ?? '1', 10);

  const currentPage = useAppSelector<number>(currentPageSelector);
  const dispatch = useAppDispatch();
  console.log(currentPage);
  ///////////////////////////////////////////
  useGetCardsQuery({ search: 's', page: 1 });

  useEffect(() => {
    dispatch(appActions.setAppCurrentPage({ currentPage: pageFromParams }));
    if (location.pathname === PATH.PAGE_ROOT) {
      navigate(`/page/${currentPage}`, { replace: true });
    }
  }, [location, pageFromParams]);

  const setVehiclesData = (vehicles: Vehicle[]) => {
    setCards(vehicles);
  };

  const setAppIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const setAppError = (error: string | null) => {
    setError(error);
  };

  const setAppRecordsCount = (count: number) => {
    setRecordsCount(count);
  };

  const fetchVehicles = async (value: string, page?: number) => {
    await fetchVehiclesThunks(
      setVehiclesData,
      setAppIsLoading,
      setAppError,
      setAppRecordsCount,
      value,
      page,
    );
  };

  return (
    <ErrorBoundary>
      <div
        className={'app'}
        style={{ ...(theme as CSSProperties) }}
        data-testid={'app'}
      >
        <ThemeControl />
        <Search
          error={error}
          pagesCount={maxPagesQuantity}
          isLoading={isLoading}
          fetchVehicles={fetchVehicles}
          setAppError={setAppError}
        />
        <div className={'content'}>
          {isLoading ? <Loader /> : <Outlet context={{ cards }} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};
