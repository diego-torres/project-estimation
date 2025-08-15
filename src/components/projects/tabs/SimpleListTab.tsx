import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, TextArea } from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";

export default function SimpleListTab<T extends { id: string; description: string }>({ items, onChange, label }: { items: T[]; onChange: (x:T[])=>void; label: string }) {
  const [local, setLocal] = useState<T[]>(items);
  useEffect(()=>setLocal(items),[items]);
  function add() { setLocal([...local, { id: Math.random().toString(36).slice(2,10), description: '' } as T]); }
  function save() { onChange(local); }
  return (
    <Card isCompact>
      <CardBody>
        <Button onClick={add}>Add</Button>
        <TableComposable aria-label={`${label} table`} variant="compact">
          <Thead><Tr><Th>{label}</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {local.map((r,i)=> (
              <Tr key={r.id}>
                <Td><TextArea value={r.description} onChange={(_,v)=>{ const c=[...local]; c[i]={...r, description:v}; setLocal(c); }} /></Td>
                <Td><Button variant="link" onClick={()=> setLocal(local.filter(x=>x.id!==r.id))}>Remove</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save</Button></CardFooter>
    </Card>
  );
}