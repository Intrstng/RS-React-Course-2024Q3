import React, { FC } from 'react';
import { CardProps } from '../../types/types';
import { NavLink } from 'react-router-dom';
import S from './Card.module.css';

export const Card: FC<CardProps> = ({ card, id }) => {
  const { name } = card;

  const linkStyles = ({ isActive }) => `${S.card} ${isActive ? S.active : ''}`;

  return (
    <NavLink to={`card/${id}`} className={linkStyles}>
      <h2>{name}</h2>
    </NavLink>
  );
};
