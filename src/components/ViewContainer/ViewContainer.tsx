import React, { FC } from 'react';
import { ViewContainerProps } from '../../types/types';
import S from './ViewContainer.module.css';
import { Vehicle } from '../Vehicle/Vehicle';

export const ViewContainer: FC<ViewContainerProps> = ({ vehicles }) => {
  return (
    <section className={S.viewContainer}>
      {vehicles.length > 0 ? (
        <ul className={S.vehiclesList}>
          {vehicles.map((vehicle, idx) => (
            <li key={idx}>
              <Vehicle vehicle={vehicle} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className={S.notification}>
          No results were found for your request...
        </h2>
      )}
    </section>
  );
};
