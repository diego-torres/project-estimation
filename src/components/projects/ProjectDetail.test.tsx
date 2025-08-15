import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import { seedUsers, seedTemplate, cloneIntoProjectFromTemplate } from '../../lib/db';
import { DB } from '../../models/types';

test('renders project detail', () => {
  const project = cloneIntoProjectFromTemplate(seedTemplate);
  const db: DB = { users: seedUsers, templates: [seedTemplate], projects: [project] };
  render(
    <MemoryRouter initialEntries={[`/projects/${project.id}`]}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail db={db} />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(project.name)).toBeTruthy();
});
