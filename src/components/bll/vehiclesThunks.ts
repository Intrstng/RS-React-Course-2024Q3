import { Vehicle, VehicleDetails, VehiclesResponse } from '../../types/types';
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
    const { results, count } = await vehiclesAPI.getVehicles<
      VehiclesResponse<VehicleDetails>
    >(value, page);
    setVehiclesData(results);
    setAppIsLoading(false);
    setAppRecordsCount(count);
  } catch (error) {
    handleError(setAppError, error);
  }
};

export const getVehicleDetails = async (
  setVehicleDetails: (vehicleDetails: VehicleDetails) => void,
  setAppIsLoading: (isLoading: boolean) => void,
  setAppError: (error: string | null) => void,
  setImgSrc: (img: string | null) => void,
  id: string,
): Promise<VehicleDetails> => {
  setAppIsLoading(true);
  setAppError(null);
  try {
    const response = await vehiclesAPI.getVehicleDetails<VehicleDetails>(id);
    setVehicleDetails(response);
    setImgSrc(`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`);
  } catch (error) {
    handleError(setAppError, error);
  } finally {
    setAppIsLoading(false);
  }
};
