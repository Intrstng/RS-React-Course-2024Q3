import React, { FC } from 'react';
import { VehicleProps } from '../../types/types';
import { NavLink } from 'react-router-dom';
import S from './Vehicle.module.css';

export const Vehicle: FC<VehicleProps> = ({ vehicle, id }) => {
  const { name } = vehicle;

  const linkStyles = ({ isActive }) =>
    `${S.vehicle} ${isActive ? S.active : ''}`;

  return (
    <NavLink to={`vehicle/${id}`} className={linkStyles}>
      <h2>{name}</h2>
    </NavLink>
  );
};
