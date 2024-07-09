import { Vehicle } from '../../types/types';
import { vehiclesAPI } from '../dal/api/vehiclesAPI';
import { handleError } from '../utils/handleError';

export const fetchVehiclesThunks = async (
  setVehiclesData: (vehicles: Vehicle[]) => void,
  setAppIsLoading: (isLoading: boolean) => void,
  setAppError: (error: string | null) => void,
  setAppRecordsCount: (count: number) => void,
  value: string,
  page?: number,
): Promise<void> => {
  setAppIsLoading(true);
  setAppError(null);
  try {
    const { results, count } = await vehiclesAPI.getVehicles(value, page);
    setVehiclesData(results);
    setAppIsLoading(false);
    setAppRecordsCount(count);
  } catch (error) {
    handleError(setAppError, error);
  }
};
