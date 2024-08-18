import { ValidationError } from 'yup';
import { FieldError } from 'react-hook-form';

type FormData = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  agreement?: boolean;
  image?: string;
  country?: string;
};

export type Form = {
  id: string;
  type: FormType;
  data: FormData;
};

export type HookFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  image: FileList;
  country: string;
};

export type FormType = 'uncontrolled' | 'controlled';

export type FormValueError = { [index: string]: ValidationError | undefined };

export type CardProps = {
  card: Form;
  count: number;
};

export type ControlledSearchBarProps = {
  countries: string[];
  error: FieldError | undefined;
  resetError?: () => void;
  onChange: (value: string) => void;
  value: string | undefined;
};

export type CustomErrorProps = {
  error: FieldError | ValidationError | undefined;
};
