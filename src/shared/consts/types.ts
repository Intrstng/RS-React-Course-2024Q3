type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  agreement: boolean;
  image: string;
  country: string;
};

export type Form = {
  id: string;
  type: 'uncontrolled' | 'controlled';
  data: FormData;
};

export type HookFormData = Omit<FormData, 'image'> & {
  image: File[];
};
