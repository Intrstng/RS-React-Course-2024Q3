// import { expect, tests } from 'vitest'
//
// import { userEvent } from '@testing-library/user-event'
// import { render, screen } from '@testing-library/react';
// import { App } from '../src/App.js';
// import matchers from '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
//
// expect.extend(matchers);
//
// tests('should display hello message', () => {
//   render(<BrowserRouter><App /></BrowserRouter>);
//   const message = screen.queryByText(/hello/i);
//   expect(message).toBeVisible();
// });
import React from 'react';
import { describe, expect, it, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('should display hello message', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  //const message = screen.queryByText(/hello/i);
  // expect(message).toBeVisible();

  await waitFor(() => {
    const message = screen.queryByText(/hello/i);
    expect(message).toBeInTheDocument();
  });
});

describe('App', () => {
  it('should have', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
