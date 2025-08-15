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
import { OpportunityInfo } from '../../models/types';

interface LoadedProject {
  repo: RepoRef;
  info: OpportunityInfo;
}

export default function ProjectsList() {
  const [repo, setRepo] = useState('');
  const [projects, setProjects] = useState<LoadedProject[]>([]);

  const load = async () => {
    const [owner, name] = repo.split('/');
    if (!owner || !name) return;
    const info = await api.getOpportunity({ owner, repo: name });
    setProjects((prev) => [...prev, { repo: { owner, repo: name }, info }]);
    const meta = await api.loadMeta();
    const recents = [`${owner}/${name}`, ...meta.recents.filter((r) => r !== `${owner}/${name}`)].slice(0, 5);
    await api.saveMeta({ recents });
  };

  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <TextInput
              aria-label="project repository"
              value={repo}
              onChange={(_event, value) => setRepo(value)}
              placeholder="owner/repo"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={load}>Load project</Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      {projects.length === 0 ? (
        <Bullseye>
          <EmptyState titleText="No projects loaded" icon={ExclamationTriangleIcon}>
            <EmptyStateBody>Enter a repository to load a project.</EmptyStateBody>
            <EmptyStateFooter>
              <Button onClick={load}>Load project</Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <table role="grid" className="pf-v5-c-table pf-m-compact">
          <caption>Projects</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Repository</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={`${p.repo.owner}/${p.repo.repo}`}>
                <td>{p.info.opportunityName}</td>
                <td>{p.info.clientName}</td>
                <td>{`${p.repo.owner}/${p.repo.repo}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageSection>
  );
}

