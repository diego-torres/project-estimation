import React, { useState } from "react";
import { Alert, AlertActionCloseButton, Dropdown, DropdownItem, DropdownList, DropdownToggle, Label, PageSection, Tab, Tabs, Title, Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import { DB, Project, ProjectStatus } from "../../models/types";
import ShareProjectButton from "./ShareProjectButton";
import OverviewTab from "./tabs/OverviewTab";
import MatrixTab from "./tabs/MatrixTab";
import OutcomesTab from "./tabs/OutcomesTab";
import TasksTab from "./tabs/TasksTab";
import SimpleListTab from "./tabs/SimpleListTab";
import TrainingTab from "./tabs/TrainingTab";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectDetail({ db, persist }: { db: DB; persist: (u:(d:DB)=>void)=>void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = db.projects.find(p => p.id === id);
  const [activeKey, setActiveKey] = useState<string | number>(0);
  const [alert, setAlert] = useState<string | null>(null);

  if (!project) return (
    <PageSection>
      <Alert variant="danger" title="Project not found" actionClose={<AlertActionCloseButton onClose={()=>navigate('/projects')} />} />
    </PageSection>
  );

  const update = (u: Partial<Project>) => {
    persist(d => { d.projects = d.projects.map(p => p.id===project.id ? { ...p, ...u, updatedAt: new Date().toISOString() } : p); });
  };

  return (
    <PageSection isFilled>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem><Title headingLevel="h2">{project.name}</Title></ToolbarItem>
          <ToolbarItem variant="separator" />
          <ToolbarItem><Label color="blue">{project.status}</Label></ToolbarItem>
          <ToolbarItem>
            <Dropdown toggle={(ref)=> <DropdownToggle ref={ref}>Change status</DropdownToggle>}>
              <DropdownList>
                {["created","level of effort completed","peer verified","delivered to client"].map(s => (
                  <DropdownItem key={s} onClick={()=>update({ status: s as ProjectStatus })}>{s}</DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem>
            <ShareProjectButton users={db.users} sharing={project.sharing} onSave={(sharing)=>update({ sharing })} />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {alert && (<Alert variant="success" title={alert} actionClose={<AlertActionCloseButton onClose={()=>setAlert(null)} />} />)}

      <Tabs activeKey={activeKey} onSelect={(_,k)=>setActiveKey(k)}>
        <Tab title="Overview" eventKey={0}><OverviewTab project={project} onUpdate={update} /></Tab>
        <Tab title="Complexity matrix" eventKey={1}><MatrixTab matrix={project.matrix} onChange={(m)=>update({ matrix: m })} /></Tab>
        <Tab title="Outcomes" eventKey={2}><OutcomesTab items={project.outcomes} onChange={(items)=>update({ outcomes: items })} /></Tab>
        <Tab title="Tasks" eventKey={3}><TasksTab items={project.tasks} onChange={(items)=>update({ tasks: items })} /></Tab>
        <Tab title="Risks" eventKey={4}><SimpleListTab items={project.risks} onChange={(items)=>update({ risks: items })} label="Risk" /></Tab>
        <Tab title="Out of scope" eventKey={5}><SimpleListTab items={project.outOfScope} onChange={(items)=>update({ outOfScope: items })} label="Out of scope" /></Tab>
        <Tab title="Prereqs & assumptions" eventKey={6}><SimpleListTab items={project.prereqs} onChange={(items)=>update({ prereqs: items })} label="Prerequisite / Assumption" /></Tab>
        <Tab title="Training" eventKey={7}><TrainingTab items={project.training} onChange={(items)=>update({ training: items })} /></Tab>
      </Tabs>
    </PageSection>
  );
}