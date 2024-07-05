import { ReactNode } from 'react';

export type Vehicle = string;

export type StateApp = {
  isLoading: boolean;
  vehicles: Vehicle[];
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
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
