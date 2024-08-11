'use client';
import React, { FC } from 'react';
import { CardProps } from '../../shared/types/types';
import S from '../../styles/Card.module.css';
import { SuperCheckBox } from '../SuperCheckBox/SuperCheckBox';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { favoritesActions } from '../../redux/slices/favoritesSlice';
import { appActions } from '../../redux/slices/appSlice';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { favoriteCardsSelector } from '../../redux/selectors/favoritesSelectors';

export const Card: FC<CardProps> = ({ card, pageId, cardId }) => {
  const { name } = card;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search');
  const dispatch = useAppDispatch();
  const isActive =
    pathname === `/page/${pageId}` &&
    searchParams.get('card') === cardId.toString();

  const favoriteCards = useAppSelector(favoriteCardsSelector);
  const isChecked = favoriteCards.some((favCard) => favCard.id === cardId);

  const onChangeInputStatusHandler = () => {
    dispatch(favoritesActions.toggleCardToFavorites({ cardId, card }));
    dispatch(appActions.showIsToastify());
  };

  const href = querySearch
    ? `/page/${pageId}?search=${querySearch}&card=${cardId}`
    : `/page/${pageId}?card=${cardId}`;

  return (
    <div className={S.card}>
      <Link href={href} className={isActive ? S.active : ''}>
        <h2 className={'cardListTitle--color'}>{name}</h2>
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
