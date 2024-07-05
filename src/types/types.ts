import { ReactNode } from 'react';

export type Vehicle = {
  name: string;
  model: string;
  vehicleClass: string;
  manufacturer: string;
  length: string;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: string;
  cargoCapacity: string;
  consumables: string;
};

export type AppState = {
  isLoading: boolean;
  vehicles: Vehicle[];
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string | null;
};

export type ViewContainerProps = {
  vehicles: Vehicle[];
};

export type ButtonProps = {
  onClickCallBack: () => void;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

export type SearchContainerState = {
  text: string;
  error: string | null;
};

export type SearchContainerProps = {
  setVehicles: (vehicles: Vehicle[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type VehicleProps = {
  vehicle: Vehicle;
};
