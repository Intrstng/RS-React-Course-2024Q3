import React, { ChangeEvent, FC, ReactNode } from 'react';
import S from './SuperCheckBox.module.css';

export const SuperCheckBox: FC<SuperCheckBoxProps> = ({
  isChecked,
  onChangeHandler,
  children,
}) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e);
  };

  return (
    <div className={S.checkbox}>
      <label className={S.formControl}>
        <input
          className={S.inputCheckbox}
          type={'checkbox'}
          name={'checkbox'}
          checked={isChecked}
          onChange={onChangeInputHandler}
        />
        {children}
      </label>
    </div>
  );
};

export type SuperCheckBoxProps = {
  isChecked: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
};
