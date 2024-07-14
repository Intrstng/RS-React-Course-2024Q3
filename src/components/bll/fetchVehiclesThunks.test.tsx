import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchVehiclesThunks, getVehicleDetails } from './vehiclesThunks';
import { vehiclesAPI } from '../dal/api/vehiclesAPI';
import { handleError } from '../utils/handleError';
import { mockCards, mockResponse } from '../../test/mockData';

vi.mock('../dal/api/vehiclesAPI');
vi.mock('../utils/handleError');

const TEST_VALUE = 'testValue';
const VEHICLE_ID = '1';
const PAGE = 1;

describe('fetchVehiclesThunks', () => {
  const setVehiclesData = vi.fn();
  const setAppIsLoading = vi.fn();
  const setAppError = vi.fn();
  const setAppRecordsCount = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch vehicles and update state correctly', async () => {
    vehiclesAPI.getVehicles.mockResolvedValue(mockResponse);

    await fetchVehiclesThunks(
      setVehiclesData,
      setAppIsLoading,
      setAppError,
      setAppRecordsCount,
      TEST_VALUE,
      PAGE,
    );

    expect(setAppIsLoading).toHaveBeenCalledWith(true);
    expect(setAppError).toHaveBeenCalledWith(null);
    expect(setVehiclesData).toHaveBeenCalledWith(mockResponse.results);
    expect(setAppIsLoading).toHaveBeenCalledWith(false);
    expect(setAppRecordsCount).toHaveBeenCalledWith(mockResponse.count);
  });

  test('should handle errors correctly', async () => {
    const mockError = new Error('Test Error');
    vehiclesAPI.getVehicles.mockRejectedValue(mockError);

    await fetchVehiclesThunks(
      setVehiclesData,
      setAppIsLoading,
      setAppError,
      setAppRecordsCount,
      TEST_VALUE,
      PAGE,
    );

    expect(setAppIsLoading).toHaveBeenCalledWith(true);
    expect(setAppError).toHaveBeenCalledWith(null);
    expect(handleError).toHaveBeenCalledWith(setAppError, mockError);
    expect(setAppIsLoading).toHaveBeenCalledWith(false);
  });
});

describe('getVehicleDetails', () => {
  const setVehicleDetails = vi.fn();
  const setAppIsLoading = vi.fn();
  const setAppError = vi.fn();
  const setImgSrc = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch vehicle details and update state correctly', async () => {
    vehiclesAPI.getVehicleDetails.mockResolvedValue(mockCards[0]);

    await getVehicleDetails(
      setVehicleDetails,
      setAppIsLoading,
      setAppError,
      setImgSrc,
      VEHICLE_ID,
    );

    expect(setAppIsLoading).toHaveBeenCalledWith(true);
    expect(setAppError).toHaveBeenCalledWith(null);
    expect(setVehicleDetails).toHaveBeenCalledWith(mockCards[0]);
    expect(setImgSrc).toHaveBeenCalledWith(
      `https://starwars-visualguide.com/assets/img/vehicles/${VEHICLE_ID}.jpg`,
    );
    expect(setAppIsLoading).toHaveBeenCalledWith(false);
  });

  test('should handle errors correctly', async () => {
    const mockError = new Error('Test Error');
    vehiclesAPI.getVehicleDetails.mockRejectedValue(mockError);

    await getVehicleDetails(
      setVehicleDetails,
      setAppIsLoading,
      setAppError,
      setImgSrc,
      VEHICLE_ID,
    );

    expect(setAppIsLoading).toHaveBeenCalledWith(true);
    expect(setAppError).toHaveBeenCalledWith(null);
    expect(handleError).toHaveBeenCalledWith(setAppError, mockError);
    expect(setAppIsLoading).toHaveBeenCalledWith(false);
  });
});
