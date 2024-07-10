import React, { FC } from 'react';
import { VehicleProps } from '../../types/types';
import { Link } from 'react-router-dom';
import S from './Vehicle.module.css';

export const Vehicle: FC<VehicleProps> = ({ vehicle, id }) => {
  const { name } = vehicle;
  console.log(id);
  return (
    <Link className={S.vehicle} to={`vehicle/${id}`}>
      <h2>{name}</h2>
    </Link>
  );
};
