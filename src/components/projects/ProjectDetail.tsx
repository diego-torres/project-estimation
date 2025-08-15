import React from 'react';
import { Alert, AlertActionCloseButton, Label, PageSection, Title } from '@patternfly/react-core';
import { DB } from '../../models/types';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectDetail({ db }: { db: DB }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = db.projects.find(p => p.id === id);
  if (!project) {
    return (
      <PageSection>
        <Alert variant="danger" title="Project not found" actionClose={<AlertActionCloseButton onClose={()=>navigate('/projects')} />} />
      </PageSection>
    );
  }
  return (
    <PageSection>
      <Title headingLevel="h2">{project.name}</Title>
      <Label color="blue">{project.status}</Label>
    </PageSection>
  );
}
