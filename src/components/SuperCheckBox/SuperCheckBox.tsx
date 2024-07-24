import React, { ChangeEvent, FC } from 'react';
import S from './SuperCheckBox.module.css';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { useAppDispatch } from '../../redux/store';

export const SuperCheckBox: FC<SuperCheckBoxProps> = ({
  cardId,
  isChecked,
}) => {
  const dispatch = useAppDispatch();

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      cardsActions.toggleDomainCardToFavorites({
        cardId,
        isChecked: e.currentTarget.checked,
      }),
    );
  };

  return (
    <div className={S.checkbox}>
      <label className={S.formControl}>
        <input
          type="checkbox"
          name="checkbox"
          checked={isChecked}
          onChange={onChangeInputStatusHandler}
        />
        Save to favorites
      </label>
    </div>
  );
};

export type SuperCheckBoxProps = {
  cardId: string;
  isChecked: boolean;
};
