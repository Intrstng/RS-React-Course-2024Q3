import { ChangeEvent, ReactNode } from 'react';
import { RefineFavoritesItemsStructureToCSV } from '../uitils/refineFavoritesItemsStructureToCSV';

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

export type DetailedVehicle = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
  isChecked: boolean;
  id: string;
};

export type VehicleDetails = Vehicle & {
  cost_in_credits: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
};

export type VehicleDetailsDomain = VehicleDetails & {
  id: string;
  isChecked: boolean;
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

export type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'search'
  | 'error'
  | 'select'
  | 'alert'
  | 'delete';

export type ButtonProps = {
  onClickCallBack?: () => void;
  className?: string;
  disabled?: boolean;
  type?: ButtonType;
  children: ReactNode;
  color?: ColorScheme;
};

export type CardProps = {
  card: VehicleDetailsDomain;
  pageId: number;
  cardId?: string;
};

export type SearchFieldProps = {
  placeholder: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  color?: ColorScheme;
};

export type DetailsPageParams = {
  pageId: string;
  cardId: string;
};

export type DownloadCSVProps = {
  data: RefineFavoritesItemsStructureToCSV;
  fileName?: string;
  color?: ColorScheme;
};
