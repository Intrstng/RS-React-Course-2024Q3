import React, { ChangeEvent, useRef } from 'react';
import S from './PasswordBar.module.css';

export const PasswordBar = () => {
  return (
    <div className={S.formGroup}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className={S.formInput}
        // onChange={onChangeCheckPassStrength}
      />
      <div className={S['power-container']}>
        <div className={S['power-point']}></div>
      </div>
    </div>
  );
};
