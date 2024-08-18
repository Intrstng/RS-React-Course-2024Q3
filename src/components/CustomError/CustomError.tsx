import { FC } from 'react';
import S from './CustomError.module.css';
import { CustomErrorProps } from '../../shared/consts/types';

export const CustomError: FC<CustomErrorProps> = ({ error }) => {
  return error && <p className={S.errorMessage}>{error.message}</p>;
};
