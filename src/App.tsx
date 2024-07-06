import React, { Component } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { AppState } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ViewContainer } from './components/ViewContainer/ViewContainer';
import loadSpinner from './assets/load-spinner.gif';
import {
  fetchVehiclesThunks,
  searchVehiclesThunks,
} from './components/bll/vehiclesThunks';

export class App extends Component<unknown, AppState> {
  state: AppState = {
    isLoading: false,
    vehicles: [],
    error: null,
  };

  private fetchVehicles = async (value: string) => {
    if (value.length !== 0) {
      await searchVehiclesThunks(this.setState.bind(this), value);
    } else {
      await fetchVehiclesThunks(this.setState.bind(this));
    }
  };

  setError = (error: string | null) => {
    this.setState((prevState) => ({ ...prevState, error }));
  };

  render() {
    const { isLoading, vehicles } = this.state;
    return (
      <ErrorBoundary>
        <SearchContainer
          error={this.state.error}
          fetchVehicles={this.fetchVehicles}
          setError={this.setError}
        />
        {isLoading ? (
          <>
            <img src={loadSpinner} alt={'loading'} />
            <p className={'loading'}>Loading...</p>
          </>
        ) : (
          <ViewContainer vehicles={vehicles} />
        )}
      </ErrorBoundary>
    );
  }
}
