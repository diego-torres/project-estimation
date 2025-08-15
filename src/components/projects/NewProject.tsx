import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardTitle, Form, FormGroup, MenuToggle, PageSection, Select, SelectList, SelectOption, TextInput } from "@patternfly/react-core";
import { DB } from "../../models/types";
import { useNavigate } from "react-router-dom";
import { cloneIntoProjectFromTemplate, seedTemplate } from "../../lib/db";

export default function NewProject({ db, persist }: { db: DB; persist: (u:(d:DB)=>void)=>void }) {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(db.templates[0]?.id ?? null);
  const [name, setName] = useState("");

  function create() {
    const t = db.templates.find(tt => tt.id === selectedTemplateId!) ?? seedTemplate;
    const p = cloneIntoProjectFromTemplate(t);
    p.name = name || p.name;
    persist(d => d.projects.unshift(p));
    navigate(`/projects/${p.id}`);
  }

  return (
    <PageSection>
      <Card isCompact>
        <CardTitle>Create Project</CardTitle>
        <CardBody>
          <Form>
            <FormGroup label="Name" fieldId="proj-name" isRequired>
              <TextInput id="proj-name" value={name} onChange={(_,v)=>setName(v)} placeholder="e.g., Contoso OpenShift Migration" />
            </FormGroup>
            <FormGroup label="Based on template" fieldId="proj-template">
              <Select isOpen={false} onOpenChange={()=>{}} selected={selectedTemplateId} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{db.templates.find(t=>t.id===selectedTemplateId!)?.name ?? 'Select template'}</MenuToggle>)}>
                <SelectList>
                  {db.templates.map(t => (<SelectOption key={t.id} value={t.id} onClick={()=>setSelectedTemplateId(t.id)}>{t.name}</SelectOption>))}
                </SelectList>
              </Select>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button onClick={create} variant="primary">Create</Button>
          <Button variant="link" onClick={()=>navigate(-1)}>Cancel</Button>
        </CardFooter>
      </Card>
    </PageSection>
  );
}