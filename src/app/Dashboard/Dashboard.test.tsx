import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
it('renders dashboard landing text', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Project Estimation App/i)).toBeTruthy();
});
