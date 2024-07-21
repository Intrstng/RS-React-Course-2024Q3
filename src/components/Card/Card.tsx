import React, { FC, useContext } from 'react';
import { CardProps } from '../../types/types';
import { NavLink } from 'react-router-dom';
import S from './Card.module.css';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';

export const Card: FC<CardProps> = ({ card, id }) => {
  const { themeType, theme } = useContext(ThemeContext);
  const { name } = card;

  const linkStyles = ({ isActive }) => `${S.card} ${isActive ? S.active : ''}`;

  const textStyle =
    themeType === ThemeType.LIGHT
      ? { color: theme['--secondary'] }
      : { color: theme['--white'] };

  return (
    <NavLink to={`card/${id}`} className={linkStyles}>
      <h2 style={textStyle}>{name}</h2>
    </NavLink>
  );
};
