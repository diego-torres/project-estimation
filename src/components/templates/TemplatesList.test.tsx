import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TemplatesList from './TemplatesList';
import { seedTemplate } from '../../lib/db';
import { api } from '../../lib/api';

jest.mock('../../lib/api', () => ({
  api: {
    getTemplate: jest.fn(),
    loadMeta: jest.fn(() => Promise.resolve({ recents: [], prefs: {} })),
    saveMeta: jest.fn(() => Promise.resolve()),
    copyTemplate: jest.fn(),
  },
}));

test('loads template from repo', async () => {
  (api.getTemplate as jest.Mock).mockResolvedValue(seedTemplate);
  render(
    <MemoryRouter>
      <TemplatesList />
    </MemoryRouter>
  );
  fireEvent.change(screen.getByPlaceholderText('owner/repo'), { target: { value: 'foo/bar' } });
  fireEvent.click(screen.getAllByText('Load template')[0]);
  expect(await screen.findByText(seedTemplate.name)).toBeTruthy();
});

