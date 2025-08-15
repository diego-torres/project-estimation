import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Form, FormGroup, PageSection, TextArea, TextInput, Title } from "@patternfly/react-core";
import { DB, ProjectTemplate, uid } from "../../models/types";
import { useNavigate, useParams } from "react-router-dom";

export default function TemplateEditor({ db, persist }: { db: DB; persist: (u:(d:DB)=>void)=>void }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = id && id !== 'new';
  const [template, setTemplate] = useState<ProjectTemplate>(editing ? db.templates.find(t=>t.id===id)! : {
    id: uid(), name: "", description: "", defaults: {}
  });
  const [outcomes, setOutcomes] = useState("[]");
  const [tasks, setTasks] = useState("[]");
  const [risks, setRisks] = useState("[]");
  const [outOfScope, setOutOfScope] = useState("[]");
  const [prereqs, setPrereqs] = useState("[]");
  const [training, setTraining] = useState("[]");
  const [teamRoles, setTeamRoles] = useState("[]");
  const [teamModeling, setTeamModeling] = useState("[]");
  useEffect(()=>{ if (editing) {
      const t = db.templates.find(t=>t.id===id)!;
      setTemplate(t);
      setOutcomes(JSON.stringify(t.defaults.outcomes ?? [], null, 2));
      setTasks(JSON.stringify(t.defaults.tasks ?? [], null, 2));
      setRisks(JSON.stringify(t.defaults.risks ?? [], null, 2));
      setOutOfScope(JSON.stringify(t.defaults.outOfScope ?? [], null, 2));
      setPrereqs(JSON.stringify(t.defaults.prereqs ?? [], null, 2));
      setTraining(JSON.stringify(t.defaults.training ?? [], null, 2));
      setTeamRoles(JSON.stringify(t.defaults.teamRoles ?? [], null, 2));
      setTeamModeling(JSON.stringify(t.defaults.teamModeling ?? [], null, 2));
    }
  },[editing,id,db.templates]);

  function parse<T>(str: string, fallback: T): T {
    try { return str.trim() ? JSON.parse(str) : fallback; } catch { return fallback; }
  }
  function save() {
    const updated: ProjectTemplate = {
      ...template,
      defaults: {
        ...template.defaults,
        outcomes: parse(outcomes, []),
        tasks: parse(tasks, []),
        risks: parse(risks, []),
        outOfScope: parse(outOfScope, []),
        prereqs: parse(prereqs, []),
        training: parse(training, []),
        teamRoles: parse(teamRoles, []),
        teamModeling: parse(teamModeling, []),
      }
    };
    persist(d => {
      if (editing) d.templates = d.templates.map(t => t.id===updated.id? updated : t);
      else d.templates.push(updated);
    });
    navigate('/templates');
  }

  return (
    <PageSection isFilled>
      <Title headingLevel="h2">{editing? 'Edit Template' : 'New Template'}</Title>
      <Card isCompact>
        <CardBody>
            <Form>
              <FormGroup label="Name" isRequired fieldId="temp-name">
                <TextInput id="temp-name" value={template.name} onChange={(_,v)=>setTemplate({...template, name:v})} />
              </FormGroup>
              <FormGroup label="Description" fieldId="temp-desc">
                <TextArea id="temp-desc" value={template.description} onChange={(_,v)=>setTemplate({...template, description:v})} />
              </FormGroup>
              <FormGroup label="Outcomes (JSON)" fieldId="temp-outcomes">
                <TextArea id="temp-outcomes" value={outcomes} onChange={(_,v)=>setOutcomes(v)} />
              </FormGroup>
              <FormGroup label="Tasks (JSON)" fieldId="temp-tasks">
                <TextArea id="temp-tasks" value={tasks} onChange={(_,v)=>setTasks(v)} />
              </FormGroup>
              <FormGroup label="Risks (JSON)" fieldId="temp-risks">
                <TextArea id="temp-risks" value={risks} onChange={(_,v)=>setRisks(v)} />
              </FormGroup>
              <FormGroup label="Out of scope (JSON)" fieldId="temp-oos">
                <TextArea id="temp-oos" value={outOfScope} onChange={(_,v)=>setOutOfScope(v)} />
              </FormGroup>
              <FormGroup label="Prerequisites (JSON)" fieldId="temp-prereqs">
                <TextArea id="temp-prereqs" value={prereqs} onChange={(_,v)=>setPrereqs(v)} />
              </FormGroup>
              <FormGroup label="Training recommendations (JSON)" fieldId="temp-training">
                <TextArea id="temp-training" value={training} onChange={(_,v)=>setTraining(v)} />
              </FormGroup>
              <FormGroup label="Team roles (JSON)" fieldId="temp-teamroles">
                <TextArea id="temp-teamroles" value={teamRoles} onChange={(_,v)=>setTeamRoles(v)} />
              </FormGroup>
              <FormGroup label="Team modeling (JSON)" fieldId="temp-teammodeling">
                <TextArea id="temp-teammodeling" value={teamModeling} onChange={(_,v)=>setTeamModeling(v)} />
              </FormGroup>
            </Form>
          </CardBody>
        <CardFooter>
          <Button variant="primary" onClick={save}>Save</Button>
          <Button variant="link" onClick={()=>navigate(-1)}>Cancel</Button>
        </CardFooter>
      </Card>
    </PageSection>
  );
}