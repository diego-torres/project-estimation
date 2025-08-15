import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';

it('renders home landing text', () => {
  render(<Home />);
  expect(screen.getAllByText(/Project Estimation App/i).length).toBeGreaterThan(0);
});
