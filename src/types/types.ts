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

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string | null;
};

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

type ColorScheme = 'primary' | 'secondary' | 'search' | 'error' | 'select';

export type ButtonProps = {
  onClickCallBack?: () => void;
  className?: string;
  disabled?: boolean;
  type?: ButtonType;
  children: ReactNode;
  color?: ColorScheme;
};

export type SearchContainerProps = {
  error: string | null;
  pagesCount: number;
  isLoading: boolean;
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
  color?: ColorScheme;
};

export type PaginationProps = {
  pagesCount: number;
};

export type DetailsPageParams = {
  pageId: string;
  cardId: string;
};

export type CardsContextType = {
  cards: VehicleDetails[];
};
