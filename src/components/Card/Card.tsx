import React, { FC } from 'react';
import { Form } from '../../shared/consts';
import S from './Card.module.css';

import { useAppSelector } from '../../shared/hooks/hooks';
import { isHighlightedSelector } from '../../redux/selectors/formSelectors';
type CardProps = {
  card: Form;
  count: number;
};

export const Card: FC<CardProps> = ({ card, count }: CardProps) => {
  const isHighlighted = useAppSelector<boolean>(isHighlightedSelector);
  const { type, data } = card;

  const cardItemStyles = `${S.cardItem} ${count === 0 && isHighlighted && S.active}`;

  return (
    <div className={cardItemStyles}>
      <h3>
        Card made by <span>{type}</span> form
      </h3>
      <img src={data.image} alt="avatar" />
      <p>
        <span>Name: </span>
        {data.name}
      </p>
      <p>
        <span>Age: </span>
        {data.age}
      </p>
      <p>
        <span>Email: </span>
        {data.email}
      </p>
      <p>
        <span>Password: </span>
        {data.password}
      </p>
      <p>
        <span>Gender: </span>
        {data.gender}
      </p>
      <p>
        <span>Country: </span>
        {data.country}
      </p>
    </div>
  );
};
