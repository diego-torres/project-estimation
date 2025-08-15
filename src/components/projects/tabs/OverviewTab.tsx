import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardTitle, Divider, Form, FormGroup, MenuToggle, Select, SelectList, SelectOption, TableComposable, Tbody, Td, Th, Thead, Title, TextArea, TextInput } from "@patternfly/react-core";
import { UploadIcon } from "@patternfly/react-icons";
import { Attachment, OpportunityInfo, Project } from "../../../models/types";
import { uid } from "../../../models/types";

export default function OverviewTab({ project, onUpdate }: { project: Project; onUpdate: (u:Partial<Project>)=>void }) {
  const opp = project.opportunity;
  const [local, setLocal] = useState<OpportunityInfo>(opp);
  useEffect(()=>setLocal(opp),[opp]);

  function save() { onUpdate({ opportunity: local }); }

  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [labelSel, setLabelSel] = useState<string[]>([]);

  function addAttachment() {
    const att: Attachment = { id: uid(), name: newFileName, url: newFileUrl, labels: labelSel as any };
    const attachments = [...local.attachments, att];
    setLocal({ ...local, attachments });
    setNewFileName(""); setNewFileUrl(""); setLabelSel([]);
  }

  return (
    <Card isCompact>
      <CardTitle>Opportunity information</CardTitle>
      <CardBody>
        <Form>
          <FormGroup label="Salesforce Opportunity ID" fieldId="sf-id"><TextInput id="sf-id" value={local.salesforceId} onChange={(_,v)=>setLocal({...local, salesforceId:v})} /></FormGroup>
          <FormGroup label="Salesforce Link" fieldId="sf-link"><TextInput id="sf-link" value={local.salesforceLink} onChange={(_,v)=>setLocal({...local, salesforceLink:v})} /></FormGroup>
          <FormGroup label="Client name" fieldId="client-name"><TextInput id="client-name" value={local.clientName} onChange={(_,v)=>setLocal({...local, clientName:v})} /></FormGroup>
          <FormGroup label="Client short name" fieldId="client-short"><TextInput id="client-short" value={local.clientShortName} onChange={(_,v)=>setLocal({...local, clientShortName:v})} /></FormGroup>
          <FormGroup label="Opportunity name" fieldId="opp-name"><TextInput id="opp-name" value={local.opportunityName} onChange={(_,v)=>setLocal({...local, opportunityName:v})} /></FormGroup>
          <FormGroup label="Opportunity description" fieldId="opp-desc"><TextArea id="opp-desc" value={local.opportunityDescription} onChange={(_,v)=>setLocal({...local, opportunityDescription:v})} /></FormGroup>
          <FormGroup label="Pre-sales process request (ServiceNow URL)" fieldId="sn-link"><TextInput id="sn-link" value={local.presalesRequestUrl ?? ''} onChange={(_,v)=>setLocal({...local, presalesRequestUrl:v})} /></FormGroup>
        </Form>
        <Divider className="my-4" />
        <Title headingLevel="h3">Attachments</Title>
        <TableComposable aria-label="attachments" variant="compact">
          <Thead><Tr><Th>Name</Th><Th>Labels</Th><Th>Link</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {local.attachments.map(a => (
              <Tr key={a.id}>
                <Td dataLabel="Name">{a.name}</Td>
                <Td dataLabel="Labels">{a.labels.join(', ')}</Td>
                <Td dataLabel="Link"><a href={a.url} target="_blank">Open</a></Td>
                <Td dataLabel="Actions"><Button variant="link" onClick={()=>setLocal({...local, attachments: local.attachments.filter(x=>x.id!==a.id)})}>Remove</Button></Td>
              </Tr>
            ))}
            <Tr>
              <Td><TextInput placeholder="File name" value={newFileName} onChange={(_,v)=>setNewFileName(v)} /></Td>
              <Td>
                <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{labelSel.length? labelSel.join(', ') : 'Select labels'}</MenuToggle>)}>
                  <SelectList>
                    {["scoping call","discovery session","scope presentation","GFA"].map(l => (
                      <SelectOption key={l} value={l} onClick={()=> setLabelSel(prev => prev.includes(l)? prev.filter(x=>x!==l) : [...prev,l])} isSelected={labelSel.includes(l)}>{l}</SelectOption>
                    ))}
                  </SelectList>
                </Select>
              </Td>
              <Td><TextInput placeholder="https://..." value={newFileUrl} onChange={(_,v)=>setNewFileUrl(v)} /></Td>
              <Td><Button icon={<UploadIcon />} onClick={addAttachment}>Add</Button></Td>
            </Tr>
          </Tbody>
        </TableComposable>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save overview</Button></CardFooter>
    </Card>
  );
}