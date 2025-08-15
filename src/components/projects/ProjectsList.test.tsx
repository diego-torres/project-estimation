import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsList from './ProjectsList';
import { seedUsers, seedTemplate } from '../../lib/db';
import { DB } from '../../models/types';

test('shows empty state when no projects', () => {
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [] };
  render(
    <MemoryRouter>
      <ProjectsList db={db} />
    </MemoryRouter>
  );
  expect(screen.getByText(/No projects yet/i)).toBeTruthy();
});
