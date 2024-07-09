import { ChangeEvent, ReactNode } from 'react';

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
  error: string | null;
};

export type SetStateApp = (state: (prevState: AppState) => AppState) => void;

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
};

export type SearchContainerProps = {
  error: string | null;
  fetchVehicles: (value: string) => void;
  setError: (error: string | null) => void;
};

export type VehicleProps = {
  vehicle: Vehicle;
};

export type SearchFieldProps = {
  placeholder: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
