import * as yup from 'yup';
import { countries } from '../shared/consts';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_IMAGE_FORMATS: string[] = ['image/jpeg', 'image/png'];

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, {
      message: 'The first letter of the name must be capitalized'
    }),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age cannot be negative number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Pass must have number, upper/lowercased letter, special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords does not match'),

  gender: yup.string().required('Gender is required'),
  agreement: yup
    .boolean()
    .required('Accepting the terms is required')
    .oneOf([true], 'Please accept the terms and conditions to continue'),

  image: yup
    .mixed<FileList>()
    .required('Picture is a required')
    .test('be', 'File have not uploaded', (value: FileList) => !!value[0])
    .test(
      'fileSize',
      'File size exceeds the limit of 2 MB',
      (value: FileList) => value[0] && value[0].size <= MAX_FILE_SIZE
    )
    .test(
      'fileFormat',
      'Only images with extension .png and .jpeg files are allowed.',
      (value: FileList) =>
        value[0] && SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
    ),
  country: yup
    .string()
    .required('Country is required')
    .oneOf(countries, 'Invalid country selected')
});
