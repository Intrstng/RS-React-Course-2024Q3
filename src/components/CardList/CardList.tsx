import React, { useContext } from 'react';
import S from './CardList.module.css';
import { Card } from '../Card/Card';
import { Outlet, useOutletContext } from 'react-router-dom';
import { CardsContextType } from '../../types/types';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { ThemeContext } from '../../contexts/Theme/Theme.context';

export const CardList = () => {
  const { cards } = useOutletContext<CardsContextType>();
  const { themeType, theme } = useContext(ThemeContext);

  const textStyle =
    themeType === ThemeType.LIGHT
      ? { color: theme['--search'] }
      : { color: theme['--white'] };

  return (
    <>
      <section className={S.viewContainer}>
        {cards.length > 0 ? (
          <ul className={S.vehiclesList}>
            {cards.map((card, idx) => {
              const cardId = card.url.split('/').slice(-2, -1)[0];
              return (
                <li key={idx}>
                  <Card card={card} id={cardId} />
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
