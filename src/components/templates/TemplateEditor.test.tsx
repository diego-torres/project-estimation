import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TemplateEditor from './TemplateEditor';
import { seedUsers, seedTemplate } from '../../lib/db';
import { DB } from '../../models/types';

test('renders new template form', () => {
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [] };
  render(
    <MemoryRouter initialEntries={['/templates/new']}>
      <Routes>
        <Route path="/templates/:id" element={<TemplateEditor db={db} persist={() => {}} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/New Template/i)).toBeTruthy();
});
