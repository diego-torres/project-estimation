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
  useEffect(()=>{ if (editing) setTemplate(db.templates.find(t=>t.id===id)!); },[editing,id]);

  function save() {
    persist(d => {
      if (editing) d.templates = d.templates.map(t => t.id===template.id? template : t);
      else d.templates.push(template);
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