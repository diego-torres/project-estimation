import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewProject from './NewProject';
import { seedUsers, seedTemplate } from '../../lib/db';
import { DB } from '../../models/types';

test('renders create project form', () => {
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [] };
  render(
    <MemoryRouter>
      <NewProject db={db} persist={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Create Project/i)).toBeTruthy();
});
