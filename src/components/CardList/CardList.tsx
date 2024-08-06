import React, { FC, useContext } from 'react';
import S from '../../styles/CardList.module.css';
import { Card } from '../Card/Card';
import {
  VehicleDetails,
  VehicleDetailsDomain,
  VehiclesResponse,
} from '../../shared/types/types';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { useAppSelector } from '../../redux/store';
import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';
import { CustomToastify } from '../CustomToastify/CustomToastify';
import { favoritesSelector } from '../../redux/selectors/favoritesSelectors';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';
import { useRouter } from 'next/router';
import { DetailedCard } from '../DetailedCard/DetailedCard';

export type CardListProps = {
  detailsData?: VehicleDetails | undefined;
};

const CardList: FC<CardListProps> = ({ detailsData }) => {
  const { themeType, theme } = useContext(ThemeContext);
  const domainCards =
    useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
  const favoritesItems = useAppSelector<FavoritesItems>(favoritesSelector);

  const router = useRouter();
  const { cardId } = router.query;

  const textStyle =
    themeType === ThemeType.LIGHT
      ? { color: theme['--search'] }
      : { color: theme['--white'] };

  return (
    <>
      <section className={S.viewContainer}>
        {domainCards?.results?.length > 0 ? (
          <ul className={S.vehiclesList}>
            {domainCards?.results.map((card) => {
              return (
                <li key={card.id}>
                  <Card
                    card={card}
                    cardId={card.id}
                    isChecked={card.isChecked}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 style={textStyle} className={S.notification}>
            No results were found for your request...
          </h2>
        )}
      </section>
      {cardId && (
        <aside>
          <DetailedCard detailsData={detailsData} />
        </aside>
      )}
      {Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}
    </>
  );
};

export default CardList;
