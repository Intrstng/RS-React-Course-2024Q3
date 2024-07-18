import React, { FC } from 'react';
import { ButtonProps } from '../types/types';

export const Button: FC<ButtonProps> = ({
  onClickCallBack,
  children,
  color,
  ...rest
}) => {
  const onClickHandler = () => {
    onClickCallBack && onClickCallBack();
  };
  return (
    <button
      className={`button button--${color}`}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </button>
  );
};
