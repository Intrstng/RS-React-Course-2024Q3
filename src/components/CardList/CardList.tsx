import React, { useContext } from 'react';
import S from './CardList.module.css';
import { Card } from '../Card/Card';
import { Outlet } from 'react-router-dom';
import { VehicleDetailsDomain, VehiclesResponse } from '../../types/types';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { useAppSelector } from '../../redux/store';
import { domainCardsSelector } from '../../redux/selectors/domainCardsSelectors';

export const CardList = () => {
  const { themeType, theme } = useContext(ThemeContext);

  const domainCards =
    useAppSelector<VehiclesResponse<VehicleDetailsDomain>>(domainCardsSelector);
  console.log(domainCards.results);
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
                  <Card card={card} id={card.id} isChecked={card.isChecked} />
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
      <aside>
        <Outlet />
      </aside>
    </>
  );
};
