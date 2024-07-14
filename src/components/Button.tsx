import React, { FC } from 'react';
import { ButtonProps } from '../types/types';

export const Button: FC<ButtonProps> = ({
  onClickCallBack,
  children,
  ...rest
}) => {
  const onClickHandler = () => {
    onClickCallBack && onClickCallBack();
  };
  return (
    <button onClick={onClickHandler} {...rest}>
      {children}
    </button>
  );
};
