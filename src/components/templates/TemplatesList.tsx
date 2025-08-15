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
import { ProjectTemplate, uid } from '../../models/types';

interface LoadedTemplate {
  repo: RepoRef;
  template: ProjectTemplate;
}

export default function TemplatesList() {
  const [repo, setRepo] = useState('');
  const [templates, setTemplates] = useState<LoadedTemplate[]>([]);
  const [creating, setCreating] = useState<RepoRef | null>(null);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const load = async () => {
    const [owner, name] = repo.split('/');
    if (!owner || !name) return;
    const empty = await api.isRepoEmpty({ owner, repo: name });
    if (empty) {
      setCreating({ owner, repo: name });
      return;
    }
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
      {creating && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!creating) return;
            const template: ProjectTemplate = { id: uid(), name: newName, description: newDesc, defaults: {} };
            await api.initTemplate(creating, template);
            setTemplates((prev) => [...prev, { repo: creating, template }]);
            setCreating(null);
            setNewName('');
            setNewDesc('');
          }}
        >
          <TextInput
            aria-label="template name"
            value={newName}
            onChange={(_e, v) => setNewName(v)}
            placeholder="Template name"
          />
          <TextInput
            aria-label="template description"
            value={newDesc}
            onChange={(_e, v) => setNewDesc(v)}
            placeholder="Description"
          />
          <Button type="submit">Create template</Button>
        </form>
      )}
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

