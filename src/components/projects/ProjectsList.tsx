import React, { useState } from "react";
import { Badge, Button, Bullseye, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateIcon, MenuToggle, PageSection, Select, SelectList, SelectOption, Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
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
          <EmptyState>
            <EmptyStateHeader headingLevel="h4" titleText="No projects yet" icon={<EmptyStateIcon icon={ExclamationTriangleIcon} />} />
            <EmptyStateBody>Start by creating a project. You can base it on a template.</EmptyStateBody>
            <EmptyStateFooter><Button onClick={() => navigate('/projects/new')}>Create project</Button></EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <TableComposable aria-label="Projects table" variant="compact">
          <Caption>Estimation projects</Caption>
          <Thead><Tr><Th>Name</Th><Th>Client</Th><Th>Status</Th><Th>Updated</Th></Tr></Thead>
          <Tbody>
            {filtered.map(p => (
              <Tr key={p.id}>
                <Td dataLabel="Name"><Link to={`/projects/${p.id}`}>{p.name}</Link></Td>
                <Td dataLabel="Client">{p.opportunity.clientName}</Td>
                <Td dataLabel="Status"><Badge isRead>{p.status}</Badge></Td>
                <Td dataLabel="Updated">{new Date(p.updatedAt).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      )}
    </PageSection>
  );
}