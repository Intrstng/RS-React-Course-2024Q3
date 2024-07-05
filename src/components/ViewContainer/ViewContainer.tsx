import React, { Component } from 'react';
import { ViewContainerProps } from '../../types/types';
import S from './ViewContainer.module.css';
import { Vehicle } from '../Vehicle/Vehicle';

export class ViewContainer extends Component<ViewContainerProps, unknown> {
  render() {
    return (
      <section className={S.viewContainer}>
        {this.props.vehicles.map((vehicle, idx) => (
          <Vehicle key={idx} vehicle={vehicle} />
        ))}
      </section>
    );
  }
}
