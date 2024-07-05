import React, { Component } from 'react';
import './App.css';
import { SearchContainer } from './components/SearchContainer/SearchContainer';
import { StateApp, Vehicle } from './types/types';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ViewContainer } from './components/ViewContainer/ViewContainer';

class App extends Component {
  state: StateApp = {
    isLoading: false,
    vehicles: [],
  };

  getVehicles = (vehicles: Vehicle[]) => {
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
          getVechicles={this.getVehicles}
          setIsLoading={this.setIsLoading}
        />
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <ViewContainer vehicles={vehicles} />
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
