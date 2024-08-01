import React, { useContext } from 'react';
import S from './CardList.module.css';
import { Card } from '../Card/Card';
import { VehicleDetailsDomain, VehiclesResponse, } from '../../shared/types/types';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { useAppSelector } from '../../redux/store';
import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';
import { CustomToastify } from '../CustomToastify/CustomToastify';
import { favoritesSelector } from '../../redux/selectors/favoritesSelectors';
import { FavoritesItems } from '../../redux/slices/favoritesSlice';
import { useRouter } from 'next/router';
import { DetailedCard } from '../DetailedCard/DetailedCard';

export const CardList = () => {
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
      {cardId && (<aside>
        <DetailedCard />
      </aside>)}

      {/*<aside>/!*  /!*<Outlet />*!/*!/</aside>*/}
      {Object.keys(favoritesItems)?.length > 0 && <CustomToastify />}
    </>
  );
};
