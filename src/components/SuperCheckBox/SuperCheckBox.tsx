import React, { ChangeEvent, FC, ReactNode } from 'react';
import S from './SuperCheckBox.module.css';

export const SuperCheckBox: FC<SuperCheckBoxProps> = ({
  isChecked,
  children,
  onChangeHandler,
}) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e);
  };

  return (
    <div className={S.checkbox}>
      <label className={S.formControl}>
        <input
          type="checkbox"
          name="checkbox"
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
  children: ReactNode;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
