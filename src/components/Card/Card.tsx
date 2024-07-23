import React, { FC, useContext } from 'react';
import { CardProps } from '../../types/types';
import { NavLink } from 'react-router-dom';
import S from './Card.module.css';
import { ThemeContext } from '../../contexts/Theme/Theme.context';
import { ThemeType } from '../../contexts/Theme/Theme.model';
import { SuperCheckBox } from '../SuperCheckBox/SuperCheckBox';

export const Card: FC<CardProps> = ({ card, id }) => {
  const { themeType, theme } = useContext(ThemeContext);
  const { name } = card;

  const linkStyles = ({ isActive }) => `${isActive ? S.active : ''}`;

  const textStyle =
    themeType === ThemeType.LIGHT
      ? { color: theme['--secondary'] }
      : { color: theme['--white'] };

  return (
    <div className={S.card}>
      <NavLink to={`card/${id}`} className={linkStyles}>
        <h2 style={textStyle}>{name}</h2>
      </NavLink>
      <SuperCheckBox />
    </div>
  );
};
