import React from "react";
import { Button, Bullseye, EmptyState, EmptyStateBody, EmptyStateFooter, PageSection, Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
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
          <EmptyState titleText="No templates yet" icon={ExclamationTriangleIcon}>
            <EmptyStateBody>Create a template to accelerate new projects.</EmptyStateBody>
            <EmptyStateFooter>
              <Button onClick={() => navigate('/templates/new')}>Create template</Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <table role="grid" className="pf-v5-c-table pf-m-compact">
          <caption>Project templates</caption>
          <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {db.templates.map(t => (
              <tr key={t.id}>
                <td><Link to={`/templates/${t.id}`}>{t.name}</Link></td>
                <td>{t.description}</td>
                <td><Button variant="link" onClick={() => onClone(t.id)}>Create project from template</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageSection>
  );
}