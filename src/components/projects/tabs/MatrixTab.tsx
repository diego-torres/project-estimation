import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Checkbox, Form, FormGroup, MenuToggle, Select, SelectList, SelectOption, TextArea, TextInput } from "@patternfly/react-core";
import { ComplexityMatrix } from "../../../models/types";

export default function MatrixTab({ matrix, onChange }: { matrix: ComplexityMatrix; onChange: (m:ComplexityMatrix)=>void }) {
  const [m, setM] = useState<ComplexityMatrix>(matrix);
  useEffect(()=>setM(matrix),[matrix]);
  const save = ()=> onChange(m);
  const productOptions = ["OpenShift","RHEL","Ansible","OpenStack","AMQ Streams","Quarkus","Ceph","ACS","ARO","ROSA"];
  const [prodOpen, setProdOpen] = useState(false);

  return (
    <Card isCompact>
      <CardBody>
        <Form>
          <FormGroup label="Project type" fieldId="m-type"><TextInput id="m-type" value={m.projectType} onChange={(_,v)=>setM({...m, projectType:v})} /></FormGroup>
          <FormGroup label="Contract type" fieldId="m-ct"><TextInput id="m-ct" value={m.contractType} onChange={(_,v)=>setM({...m, contractType:v})} /></FormGroup>
          <FormGroup label="Strategic importance" fieldId="m-si">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.strategicImportance}</MenuToggle>)}>
              <SelectList>{["Low","Medium","High"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, strategicImportance: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Stakeholder support" fieldId="m-ss">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.stakeholderSupport}</MenuToggle>)}>
              <SelectList>{["Low","Medium","High"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, stakeholderSupport: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Users affected" fieldId="m-ua">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.usersAffected}</MenuToggle>)}>
              <SelectList>{["<100","100-1k","1k-10k",">10k"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, usersAffected: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Requirements volatility" fieldId="m-rv">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.requirementsVolatility}</MenuToggle>)}>
              <SelectList>{["Stable","Moderate","Volatile"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, requirementsVolatility: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Red Hat products" fieldId="m-prod" helperText="Select multiple">
            <Select isOpen={prodOpen} onOpenChange={()=>setProdOpen(o=>!o)} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={prodOpen}>{m.products.length? m.products.join(', '): 'Select products'}</MenuToggle>)}>
              <SelectList>
                {productOptions.map(p => (
                  <SelectOption key={p} value={p} isSelected={m.products.includes(p)} onClick={()=> setM(prev=> ({...prev, products: prev.products.includes(p)? prev.products.filter(x=>x!==p) : [...prev.products, p]}))}>{p}</SelectOption>
                ))}
              </SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Technical dependencies" fieldId="m-td"><TextArea id="m-td" value={m.technicalDependencies} onChange={(_,v)=>setM({...m, technicalDependencies:v})} /></FormGroup>
          <FormGroup label="Partner dependencies" fieldId="m-pd"><TextArea id="m-pd" value={m.partnerDependencies} onChange={(_,v)=>setM({...m, partnerDependencies:v})} /></FormGroup>
          <FormGroup label="Geographic delivery" fieldId="m-gd"><TextInput id="m-gd" value={m.geographicDelivery} onChange={(_,v)=>setM({...m, geographicDelivery:v})} /></FormGroup>
          <FormGroup label="Urgency" fieldId="m-urg">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.urgency}</MenuToggle>)}>
              <SelectList>{["Low","Medium","High"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, urgency: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Experience with customer" fieldId="m-exp">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.priorExperience}</MenuToggle>)}>
              <SelectList>{["New","Some","Experienced"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, priorExperience: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup label="Delivery documentation language" fieldId="m-lang"><TextInput id="m-lang" value={m.documentationLanguage} onChange={(_,v)=>setM({...m, documentationLanguage:v})} /></FormGroup>
          <FormGroup label="Client system/keyboard access" fieldId="m-access">
            <Select isOpen={false} onOpenChange={()=>{}} toggle={(ref)=>(<MenuToggle ref={ref} isExpanded={false}>{m.systemAccess}</MenuToggle>)}>
              <SelectList>{["None","Limited","Full"].map(v=> <SelectOption key={v} value={v} onClick={()=>setM({...m, systemAccess: v as any})}>{v}</SelectOption>)}</SelectList>
            </Select>
          </FormGroup>
          <FormGroup fieldId="m-eng" label="Planned implementation is Engineering supported"><Checkbox id="m-eng" isChecked={m.engSupported} onChange={(_,checked)=>setM({...m, engSupported: checked})} label={m.engSupported? 'Yes' : 'No'} /></FormGroup>
          <FormGroup label="Team composition & performance notes" fieldId="m-notes"><TextArea id="m-notes" value={m.teamCompositionNotes} onChange={(_,v)=>setM({...m, teamCompositionNotes:v})} /></FormGroup>
          <FormGroup label="Team size" fieldId="m-size"><TextInput type="number" id="m-size" value={String(m.teamSize)} onChange={(_,v)=>setM({...m, teamSize: Number(v)})} /></FormGroup>
          <FormGroup label="Project duration (weeks)" fieldId="m-dur"><TextInput type="number" id="m-dur" value={String(m.durationWeeks)} onChange={(_,v)=>setM({...m, durationWeeks: Number(v)})} /></FormGroup>
        </Form>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save matrix</Button></CardFooter>
    </Card>
  );
}