import React, { useState } from 'react';
import {
  Button,
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  PageSection,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { api } from '../../lib/api';
import { RepoRef } from '../../lib/github';
import { ProjectTemplate } from '../../models/types';

interface LoadedTemplate {
  repo: RepoRef;
  template: ProjectTemplate;
}

export default function TemplatesList() {
  const [repo, setRepo] = useState('');
  const [templates, setTemplates] = useState<LoadedTemplate[]>([]);

  const load = async () => {
    const [owner, name] = repo.split('/');
    if (!owner || !name) return;
    const template = await api.getTemplate({ owner, repo: name });
    setTemplates((prev) => [...prev, { repo: { owner, repo: name }, template }]);
    const meta = await api.loadMeta();
    const recents = [`${owner}/${name}`, ...meta.recents.filter((r) => r !== `${owner}/${name}`)].slice(0, 5);
    await api.saveMeta({ recents });
  };

  const handleClone = async (t: LoadedTemplate) => {
    const dest = window.prompt('Destination repo (owner/name)');
    if (!dest) return;
    const [owner, name] = dest.split('/');
    if (!owner || !name) return;
    await api.copyTemplate(t.repo, { owner, repo: name });
  };

  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <TextInput
              aria-label="template repository"
              value={repo}
              onChange={(_event, value) => setRepo(value)}
              placeholder="owner/repo"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={load}>Load template</Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      {templates.length === 0 ? (
        <Bullseye>
          <EmptyState titleText="No templates loaded" icon={ExclamationTriangleIcon}>
            <EmptyStateBody>Enter a repository to load a template.</EmptyStateBody>
            <EmptyStateFooter>
              <Button onClick={load}>Load template</Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <table role="grid" className="pf-v5-c-table pf-m-compact">
          <caption>Project templates</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Repository</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr key={`${t.repo.owner}/${t.repo.repo}`}>
                <td>{t.template.name}</td>
                <td>{t.template.description}</td>
                <td>{`${t.repo.owner}/${t.repo.repo}`}</td>
                <td>
                  <Button variant="link" onClick={() => handleClone(t)}>
                    Copy to repo
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageSection>
  );
}

