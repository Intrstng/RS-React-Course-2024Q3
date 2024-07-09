import { Vehicle } from '../../types/types';
import { vehiclesAPI } from '../dal/api/vehiclesAPI';
import { handleError } from '../utils/handleError';

export const fetchVehiclesThunks = async (
  setVehiclesData: (vehicles: Vehicle[]) => void,
  setAppIsLoading: (isLoading: boolean) => void,
  setAppError: (error: string | null) => void,
): Promise<void> => {
  setAppIsLoading(true);
  setAppError(null);
  try {
    const { results } = await vehiclesAPI.getVehicles();
    setVehiclesData(results);
    setAppIsLoading(false);
  } catch (error) {
    handleError(setAppError, error);
  }
};

export const searchVehiclesThunks = async (
  setVehiclesData: (vehicles: Vehicle[]) => void,
  setAppIsLoading: (isLoading: boolean) => void,
  setAppError: (error: string | null) => void,
  value: string,
): Promise<void> => {
  setAppIsLoading(true);
  setAppError(null);
  try {
    const { results } = await vehiclesAPI.searchVehicles(value);
    setVehiclesData(results);
    setAppIsLoading(false);
  } catch (error) {
    handleError(setAppError, error);
  }
};
