import React, { Component } from 'react';
import { ViewContainerProps } from '../../types/types';
import S from './ViewContainer.module.css';
import { Vehicle } from '../Vehicle/Vehicle';

export class ViewContainer extends Component<ViewContainerProps, unknown> {
  render() {
    return (
      <section className={S.viewContainer}>
        {this.props.vehicles.length > 0 ? (
          <ul className={S.vehiclesList}>
            {this.props.vehicles.map((vehicle, idx) => (
              <li key={idx}>
                <Vehicle vehicle={vehicle} />
              </li>
            ))}
          </ul>
        ) : (
          <h2 className={S.notification}>
            No results were found for your request
          </h2>
        )}
      </section>
    );
  }
}
