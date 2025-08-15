import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, TextInput } from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { TrainingRec } from "../../../models/types";

export default function TrainingTab({ items, onChange }: { items: TrainingRec[]; onChange: (x:TrainingRec[])=>void }) {
  const [local, setLocal] = useState<TrainingRec[]>(items);
  useEffect(()=>setLocal(items),[items]);
  function add() { setLocal([...local, { id: Math.random().toString(36).slice(2,10), audience:'', topic:'', format:'' }]); }
  function save() { onChange(local); }
  return (
    <Card isCompact>
      <CardBody>
        <Button onClick={add}>Add training</Button>
        <TableComposable aria-label="training" variant="compact">
          <Thead><Tr><Th>Audience</Th><Th>Topic</Th><Th>Format</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {local.map((t,i)=> (
              <Tr key={t.id}>
                <Td><TextInput value={t.audience} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, audience:v}; setLocal(c); }} /></Td>
                <Td><TextInput value={t.topic} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, topic:v}; setLocal(c); }} /></Td>
                <Td><TextInput value={t.format} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, format:v}; setLocal(c); }} /></Td>
                <Td><Button variant="link" onClick={()=> setLocal(local.filter(x=>x.id!==t.id))}>Remove</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save training</Button></CardFooter>
    </Card>
  );
}