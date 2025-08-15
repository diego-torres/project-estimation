import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TemplatesList from './TemplatesList';
import { seedUsers, seedTemplate } from '../../lib/db';
import { DB } from '../../models/types';

test('renders templates table', () => {
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [] };
  render(
    <MemoryRouter>
      <TemplatesList db={db} onClone={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(seedTemplate.name)).toBeTruthy();
});
