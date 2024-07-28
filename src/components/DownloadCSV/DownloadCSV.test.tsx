import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { mockFavoritesCarsForCSV } from '../../test/mockData';
import { DownloadCSV } from './DownloadCSV';
import '@testing-library/jest-dom';

URL['createObjectURL'] = vi.fn();

describe('DownloadCSV Component', () => {
  test('renders the download link with correct filename', () => {
    render(
      <DownloadCSV
        data={mockFavoritesCarsForCSV}
        fileName="vehicles"
        color="primary"
      />,
    );

    const downloadLink = screen.getByText(/download/i);
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute(
      'download',
      `${mockFavoritesCarsForCSV.length}_vehicles.csv`,
    );
  });

  test('calls URL.createObjectURL when rendering', () => {
    render(
      <DownloadCSV
        data={mockFavoritesCarsForCSV}
        fileName="vehicles"
        color="primary"
      />,
    );

    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  test('should have the correct CSS class based on the color prop', () => {
    render(
      <DownloadCSV
        data={mockFavoritesCarsForCSV}
        fileName="test"
        color="primary"
      />,
    );

    const downloadLink = screen.getByText(/download/i);
    expect(downloadLink).toHaveClass('link link--primary');
  });
});
