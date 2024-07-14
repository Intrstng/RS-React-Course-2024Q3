import { ChangeEvent, ReactNode } from 'react';

export type Vehicle = {
  name: string;
  model: string;
  manufacturer: string;
  vehicleClass: string;
  length: string;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: string;
  cargoCapacity: string;
  consumables: string;
};

export type VehicleDetails = Vehicle & {
  cost_in_credits: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
};

export type VehiclesResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: [T];
};

export type AppState = {
  isLoading: boolean;
  vehicles: Vehicle[];
  error: string | null;
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
  currentPage: number;
};

export type DetailsPageProps = {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export type ButtonProps = {
  onClickCallBack?: () => void;
  className?: string;
  disabled?: boolean;
  type?: ButtonType;
  children: ReactNode;
};

export type SearchContainerProps = {
  error: string | null;
  pagesCount: number;
  isLoading: boolean;
  navigationPage: number;
  fetchVehicles: (value: string, page?: number) => void;
  setAppError: (error: string | null) => void;
};

export type CardProps = {
  card: Vehicle;
  id: number;
};

export type SearchFieldProps = {
  placeholder: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type PaginationProps = {
  pagesCount: number;
  currentPage: number;
};

export type DetailsPageParams = {
  pageId: string;
  vehicleId: string;
};
