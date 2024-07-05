import React, { Component } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { StateApp, Vehicle } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ViewContainer } from './components/ViewContainer/ViewContainer';
import loadSpinner from './assets/load-spinner.gif';

class App extends Component {
  state: StateApp = {
    isLoading: false,
    vehicles: [],
  };

  setVehicles = (vehicles: Vehicle[]) => {
    this.setState({ vehicles });
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  render() {
    const { isLoading, vehicles } = this.state;
    return (
      <ErrorBoundary>
        <SearchContainer
          setVehicles={this.setVehicles}
          setIsLoading={this.setIsLoading}
        />
        {isLoading ? (
          <img src={loadSpinner} alt={'loading'} />
        ) : (
          <ViewContainer vehicles={vehicles} />
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
