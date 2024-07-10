import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { Vehicle } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { fetchVehiclesThunks } from './components/bll/vehiclesThunks';
import { Loader } from './components/Loader/Loader';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH } from './routes/Route';

export const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const maxPagesQuantity = Math.ceil(recordsCount / 10);

  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(pageId ?? '1', 10);

  useEffect(() => {
    if (location.pathname === PATH.PAGE_ROOT) {
      navigate(`/page/${currentPage}`, { replace: true });
    }
  }, [location, currentPage]);

  const setVehiclesData = (vehicles: Vehicle[]) => {
    setVehicles(vehicles);
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
      <SearchContainer
        error={error}
        pagesCount={maxPagesQuantity}
        isLoading={isLoading}
        navigationPage={currentPage}
        fetchVehicles={fetchVehicles}
        setAppError={setAppError}
      />
      <div className={'content'}>
        {isLoading ? <Loader /> : <Outlet context={{ vehicles }} />}
      </div>
    </ErrorBoundary>
  );
};
