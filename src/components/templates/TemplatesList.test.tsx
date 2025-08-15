import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TemplatesList from './TemplatesList';
import { seedTemplate } from '../../lib/db';
import { api } from '../../lib/api';

jest.mock('../../lib/api', () => ({
  api: {
    getTemplate: jest.fn(),
    initTemplate: jest.fn(),
    saveTemplate: jest.fn(),
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

test('initializes empty template repo', async () => {
  (api.getTemplate as jest.Mock).mockResolvedValue({});
  (api.initTemplate as jest.Mock).mockResolvedValue(undefined);
  render(
    <MemoryRouter>
      <TemplatesList />
    </MemoryRouter>
  );
  fireEvent.change(screen.getByPlaceholderText('owner/repo'), { target: { value: 'foo/bar' } });
  fireEvent.click(screen.getAllByText('Load template')[0]);
  const nameInput = await screen.findByPlaceholderText('Template name');
  fireEvent.change(nameInput, { target: { value: 'My Tmpl' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'desc' } });
  fireEvent.click(screen.getByText('Create template'));
  expect(api.initTemplate).toHaveBeenCalled();
});

test('edits existing template', async () => {
  (api.getTemplate as jest.Mock).mockResolvedValue(seedTemplate);
  render(
    <MemoryRouter>
      <TemplatesList />
    </MemoryRouter>
  );
  fireEvent.change(screen.getByPlaceholderText('owner/repo'), { target: { value: 'foo/bar' } });
  fireEvent.click(screen.getAllByText('Load template')[0]);
  expect(await screen.findByText(seedTemplate.name)).toBeTruthy();
  fireEvent.click(screen.getByLabelText('Edit template'));
  const nameInput = await screen.findByPlaceholderText('Template name');
  fireEvent.change(nameInput, { target: { value: 'Updated' } });
  fireEvent.click(screen.getByText('Save template'));
  expect(api.saveTemplate).toHaveBeenCalled();
});

