import React, { useState } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { Vehicle } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ViewContainer } from './components/ViewContainer/ViewContainer';
import {
  fetchVehiclesThunks,
  searchVehiclesThunks,
} from './components/bll/vehiclesThunks';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setVehiclesData = (vehicles: Vehicle[]) => {
    setVehicles(vehicles);
  };

  const setAppIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const setAppError = (error: string | null) => {
    setError(error);
  };

  const fetchVehicles = async (value: string) => {
    if (value.length !== 0) {
      await searchVehiclesThunks(
        setVehiclesData,
        setAppIsLoading,
        setAppError,
        value,
      );
    } else {
      await fetchVehiclesThunks(setVehiclesData, setAppIsLoading, setAppError);
    }
  };

  return (
    <ErrorBoundary>
      <SearchContainer
        error={error}
        fetchVehicles={fetchVehicles}
        setAppError={setAppError}
      />
      {isLoading ? <Loader /> : <ViewContainer vehicles={vehicles} />}
    </ErrorBoundary>
  );
};
