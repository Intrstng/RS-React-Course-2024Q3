export type Form = {
  id: string;
  type: 'uncontrolled' | 'controlled';
  data: {
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
};
