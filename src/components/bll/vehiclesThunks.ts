import { SetStateApp } from '../../types/types';
import { vehiclesAPI } from '../dal/api/vehiclesAPI';
import { handleError } from '../utils/handleError';

export const fetchVehiclesThunks = async (
  setState: SetStateApp,
): Promise<void> => {
  setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
  try {
    const { results } = await vehiclesAPI.getVehicles();
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      vehicles: results,
    }));
  } catch (error) {
    handleError(setState, error);
  }
};

export const searchVehiclesThunks = async (
  setState: SetStateApp,
  value: string,
): Promise<void> => {
  setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
  try {
    const { results } = await vehiclesAPI.searchVehicles(value);
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      vehicles: results,
    }));
  } catch (error) {
    handleError(setState, error);
  }
};
