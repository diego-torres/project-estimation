import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsList from './ProjectsList';

jest.mock('../../lib/api', () => ({
  api: {
    getOpportunity: jest.fn(),
    loadMeta: jest.fn(() => Promise.resolve({ recents: [], prefs: {} })),
    saveMeta: jest.fn(),
  },
}));

test('shows empty state when no projects', () => {
  render(
    <MemoryRouter>
      <ProjectsList />
    </MemoryRouter>
  );
  expect(screen.getByText(/No projects loaded/i)).toBeTruthy();
});

