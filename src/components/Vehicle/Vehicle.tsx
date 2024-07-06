import React, { Component } from 'react';
import { VehicleProps } from '../../types/types';
import S from './Vehicle.module.css';

export class Vehicle extends Component<VehicleProps, unknown> {
  render() {
    const {
      name,
      model,
      vehicleClass,
      manufacturer,
      length,
      crew,
      passengers,
      maxAtmospheringSpeed,
      cargoCapacity,
      consumables,
    } = this.props;
    return (
      <>
        <h2 className={S.name}>Name: {name}</h2>
        <p>Model: {model}</p>
        <p>VehicleClass: {vehicleClass}</p>
        <p>Manufacturer: {manufacturer}</p>
        <p>Length: {length}</p>
        <p>Crew: {crew}</p>
        <p>Passengers: {passengers}</p>
        <p>Max atmosphering speed: {maxAtmospheringSpeed}</p>
        <p>Cargo capacity: {cargoCapacity}</p>
        <p>Consumables: {consumables}</p>
      </>
    );
  }
}
