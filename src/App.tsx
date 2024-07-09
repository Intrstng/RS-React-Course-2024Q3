import React, { useState } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { Vehicle } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ViewContainer } from './components/ViewContainer/ViewContainer';
import { fetchVehiclesThunks } from './components/bll/vehiclesThunks';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const maxPagesQuantity = Math.ceil(recordsCount / 10);

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
        fetchVehicles={fetchVehicles}
        setAppError={setAppError}
      />
      {isLoading ? <Loader /> : <ViewContainer vehicles={vehicles} />}
    </ErrorBoundary>
  );
};
