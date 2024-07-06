import React, { Component } from 'react';
import { VehicleProps } from '../../types/types';
import S from './Vehicle.module.css';

export class Vehicle extends Component<VehicleProps, unknown> {
  render() {
    const { name, model, manufacturer, length, crew, passengers, consumables } =
      this.props.vehicle;
    return (
      <div className={S.vehicle}>
        <h2>{name}</h2>
        <p>
          Model: <span>{model}</span>
        </p>
        <p>
          Manufacturer: <span>{manufacturer}</span>
        </p>
        <p>
          Length: <span>{length}</span>
        </p>
        <p>
          Crew: <span>{crew}</span>
        </p>
        <p>
          Passengers: <span>{passengers}</span>
        </p>
        <p>
          Consumables: <span>{consumables}</span>
        </p>
      </div>
    );
  }
}
