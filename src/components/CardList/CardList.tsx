import React from 'react';
import S from './CardList.module.css';
import { Card } from '../Card/Card';
import { Outlet, useOutletContext } from 'react-router-dom';
import { CardsContextType } from '../../types/types';

export const CardList = () => {
  const { cards } = useOutletContext<CardsContextType>();

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
          <h2 className={S.notification}>
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
