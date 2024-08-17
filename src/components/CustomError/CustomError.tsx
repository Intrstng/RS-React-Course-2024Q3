import React, { FC } from 'react';
import { ValidationError } from 'yup';
import { FieldError } from 'react-hook-form';
import S from './CustomError.module.css';

type CustomErrorProps = FieldError | ValidationError | undefined;

export const CustomError: FC<CustomErrorProps> = ({ error }) => {
  return <p className={S.errorMessage}>{error.message}</p>;
};
