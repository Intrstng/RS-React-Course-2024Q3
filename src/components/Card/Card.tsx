import React, { ChangeEvent, FC, useContext } from 'react';
import {
  CardProps,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../shared/types/types';
import S from './Card.module.css';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { SuperCheckBox } from '../SuperCheckBox/SuperCheckBox';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { favoritesActions } from '../../redux/slices/favoritesSlice';
import { appActions } from '../../redux/slices/appSlice';
import { domainCardsSelector } from '../../redux/selectors';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Card: FC<CardProps> = ({ card, cardId, isChecked }) => {
  const { themeType, theme } = useContext(ThemeContext);
  const { name } = card;
  const dispatch = useAppDispatch();
  const domainCards =
    useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
  const router = useRouter();
  const isActive = router.asPath === `/card/${cardId}`;

  const textStyle =
    themeType === ThemeType.LIGHT
      ? { color: theme['--secondary'] }
      : { color: theme['--white'] };

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      cardsActions.toggleDomainCardToFavorites({
        cardId,
        isChecked: e.currentTarget.checked,
      }),
    );
    dispatch(
      favoritesActions.toggleToFavorites({
        cardId,
        cards: domainCards.results,
      }),
    );
    dispatch(appActions.showIsToastify());
  };

  return (
    <div className={S.card}>
      <Link href={`card/${cardId}`} className={isActive ? S.active : ''}>
        <h2 style={textStyle}>{name}</h2>
      </Link>

      <SuperCheckBox
        isChecked={isChecked}
        onChangeHandler={onChangeInputStatusHandler}
      >
        Save to favorites
      </SuperCheckBox>
    </div>
  );
};
