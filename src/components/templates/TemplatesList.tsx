import React from "react";
import { Button, Bullseye, EmptyState, EmptyStateBody, EmptyStateHeader, EmptyStateIcon, EmptyStateFooter, PageSection, Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import { TableComposable, Tbody, Td, Th, Thead, Tr, Caption } from "@patternfly/react-table";
import { ExclamationTriangleIcon, PlusCircleIcon } from "@patternfly/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { DB } from "../../models/types";

export default function TemplatesList({ db, onClone }: { db: DB; onClone: (id: string) => void }) {
  const navigate = useNavigate();
  return (
    <PageSection>
      <Toolbar><ToolbarContent><ToolbarItem><Button icon={<PlusCircleIcon />} onClick={() => navigate('/templates/new')}>New Template</Button></ToolbarItem></ToolbarContent></Toolbar>
      {db.templates.length === 0 ? (
        <Bullseye>
          <EmptyState>
            <EmptyStateHeader headingLevel="h4" titleText="No templates yet" icon={<EmptyStateIcon icon={ExclamationTriangleIcon} />} />
            <EmptyStateBody>Create a template to accelerate new projects.</EmptyStateBody>
            <EmptyStateFooter><Button onClick={() => navigate('/templates/new')}>Create template</Button></EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <TableComposable aria-label="Templates table" variant="compact">
          <Caption>Project templates</Caption>
          <Thead><Tr><Th>Name</Th><Th>Description</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {db.templates.map(t => (
              <Tr key={t.id}>
                <Td dataLabel="Name"><Link to={`/templates/${t.id}`}>{t.name}</Link></Td>
                <Td dataLabel="Description">{t.description}</Td>
                <Td dataLabel="Actions"><Button variant="link" onClick={() => onClone(t.id)}>Create project from template</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      )}
    </PageSection>
  );
}