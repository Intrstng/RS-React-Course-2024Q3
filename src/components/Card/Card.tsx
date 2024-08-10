'use client'
import React, { ChangeEvent, FC } from 'react';
import {
  CardProps,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../shared/types/types';
import S from '../../styles/Card.module.css';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { SuperCheckBox } from '../SuperCheckBox/SuperCheckBox';
import { cardsActions } from '../../redux/slices/cardsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { favoritesActions } from '../../redux/slices/favoritesSlice';
import { appActions } from '../../redux/slices/appSlice';
import { domainCardsSelector } from '../../redux/selectors';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';

export const Card: FC<CardProps> = ({ card, pageId,  cardId, isChecked }) => {
  const { name } = card;
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('search')
  // const dispatch = useAppDispatch();
  // const domainCards =
  //   useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
  //
  // const router = useRouter();
  const isActive = pathname === `/page/${pageId}` && searchParams.get('card') === cardId.toString();


  // const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(
  //     cardsActions.toggleDomainCardToFavorites({
  //       cardId,
  //       isChecked: e.currentTarget.checked,
  //     }),
  //   );
  //   dispatch(
  //     favoritesActions.toggleToFavorites({
  //       cardId,
  //       cards: domainCards.results,
  //     }),
  //   );
  //   dispatch(appActions.showIsToastify());
  // };

  let href = querySearch ? `/page/${pageId}?search=${querySearch}&card=${cardId}` : `/page/${pageId}?card=${cardId}`




  return (
    <div className={S.card}>
      <Link href={href} className={isActive ? S.active : ''}>
        <h2 className={'cardListTitle--color'}>{name}</h2>
      </Link>

      <SuperCheckBox
        isChecked={isChecked}
        // onChangeHandler={onChangeInputStatusHandler}
        onChangeHandler={()=> {}}
      >
        Save to favorites
      </SuperCheckBox>
    </div>
  );
};
