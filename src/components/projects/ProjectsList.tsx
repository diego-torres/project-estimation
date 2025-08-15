import React, { useState } from "react";
import { Badge, Button, Bullseye, EmptyState, EmptyStateBody, EmptyStateFooter, MenuToggle, PageSection, Select, SelectList, SelectOption, Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import { ExclamationTriangleIcon, PlusCircleIcon } from "@patternfly/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { DB, ProjectStatus } from "../../models/types";

export default function ProjectsList({ db }: { db: DB }) {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const filtered = db.projects.filter(p => statusFilter==='all' ? true : p.status===statusFilter);
  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem><Button icon={<PlusCircleIcon />} onClick={() => navigate('/projects/new')}>New Project</Button></ToolbarItem>
          <ToolbarItem>
            <Select isOpen={false} onOpenChange={()=>{}} selected={statusFilter} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>Status: {statusFilter}</MenuToggle>)}>
              <SelectList>
                {["all","created","level of effort completed","peer verified","delivered to client"].map(s => (
                  <SelectOption key={s} value={s} onClick={()=>setStatusFilter(s as any)}>{s}</SelectOption>
                ))}
              </SelectList>
            </Select>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {filtered.length === 0 ? (
        <Bullseye>
          <EmptyState titleText="No projects yet" icon={ExclamationTriangleIcon}>
            <EmptyStateBody>Start by creating a project. You can base it on a template.</EmptyStateBody>
            <EmptyStateFooter>
              <Button onClick={() => navigate('/projects/new')}>Create project</Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <table role="grid" className="pf-v5-c-table pf-m-compact">
          <caption>Estimation projects</caption>
          <thead><tr><th>Name</th><th>Client</th><th>Status</th><th>Updated</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><Link to={`/projects/${p.id}`}>{p.name}</Link></td>
                <td>{p.opportunity.clientName}</td>
                <td><Badge isRead>{p.status}</Badge></td>
                <td>{new Date(p.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageSection>
  );
}