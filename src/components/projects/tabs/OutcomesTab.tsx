import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter } from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { Outcome, uid } from "../../../models/types";
import { TextArea, TextInput } from "@patternfly/react-core";

export default function OutcomesTab({ items, onChange }: { items: Outcome[]; onChange: (x:Outcome[])=>void }) {
  const [local, setLocal] = useState<Outcome[]>(items);
  useEffect(()=>setLocal(items),[items]);
  function add() { setLocal([...local, { id: uid(), phase: '', track: '', description: '' }]); }
  function save() { onChange(local); }
  return (
    <Card isCompact>
      <CardBody>
        <Button onClick={add}>Add outcome</Button>
        <TableComposable aria-label="outcomes" variant="compact">
          <Thead><Tr><Th>Phase</Th><Th>Track</Th><Th>Description</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {local.map((o,i)=> (
              <Tr key={o.id}>
                <Td><TextInput value={o.phase} onChange={(_,v)=>{ const c=[...local]; c[i]={...o, phase:v}; setLocal(c); }} /></Td>
                <Td><TextInput value={o.track} onChange={(_,v)=>{ const c=[...local]; c[i]={...o, track:v}; setLocal(c); }} /></Td>
                <Td><TextArea value={o.description} onChange={(_,v)=>{ const c=[...local]; c[i]={...o, description:v}; setLocal(c); }} /></Td>
                <Td><Button variant="link" onClick={()=> setLocal(local.filter(x=>x.id!==o.id))}>Remove</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save outcomes</Button></CardFooter>
    </Card>
  );
}