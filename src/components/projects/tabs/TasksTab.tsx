import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, CardFooter, HelperText, HelperTextItem, Toolbar, ToolbarContent, ToolbarItem, TextInput } from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { TaskItem } from "../../../models/types";
import { pertExpected, pertStdDev, sum } from "../../../lib/pert";

export default function TasksTab({ items, onChange }: { items: TaskItem[]; onChange: (x:TaskItem[])=>void }) {
  const [local, setLocal] = useState<TaskItem[]>(items);
  useEffect(()=>setLocal(items),[items]);
  function add() { setLocal([...local, { id: Math.random().toString(36).slice(2,10), phase: '', track: '', product: '', environment: '', name: '', bestCase: 1, mostLikely: 2, worstCase: 3, notes: '' }]); }
  function save() { onChange(local); }

  const totals = useMemo(()=>{
    const exp = sum(local.map(t => pertExpected(t.bestCase, t.mostLikely, t.worstCase)));
    const sd = Math.sqrt(sum(local.map(t => Math.pow(pertStdDev(t.bestCase, t.worstCase),2))));
    return { expected: exp, p95: exp + 1.645 * sd };
  },[local]);

  return (
    <Card isCompact>
      <CardBody>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem><Button onClick={add}>Add task</Button></ToolbarItem>
            <ToolbarItem><HelperText><HelperTextItem>Expected total (days): {totals.expected.toFixed(1)} | P95 buffer: {totals.p95.toFixed(1)}</HelperTextItem></HelperText></ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <TableComposable aria-label="tasks" variant="compact">
          <Thead>
            <Tr>
              <Th>Phase</Th><Th>Track</Th><Th>Product</Th><Th>Env</Th><Th>Task</Th>
              <Th>Best</Th><Th>Most</Th><Th>Worst</Th><Th>Expected</Th><Th>Notes</Th><Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {local.map((t,i)=> {
              const expected = pertExpected(t.bestCase, t.mostLikely, t.worstCase);
              return (
                <Tr key={t.id}>
                  <Td><TextInput value={t.phase} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, phase:v}; setLocal(c); }} /></Td>
                  <Td><TextInput value={t.track} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, track:v}; setLocal(c); }} /></Td>
                  <Td><TextInput value={t.product} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, product:v}; setLocal(c); }} /></Td>
                  <Td><TextInput value={t.environment} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, environment:v}; setLocal(c); }} /></Td>
                  <Td width={25}><TextInput value={t.name} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, name:v}; setLocal(c); }} /></Td>
                  <Td><TextInput type="number" value={String(t.bestCase)} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, bestCase:Number(v)}; setLocal(c); }} /></Td>
                  <Td><TextInput type="number" value={String(t.mostLikely)} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, mostLikely:Number(v)}; setLocal(c); }} /></Td>
                  <Td><TextInput type="number" value={String(t.worstCase)} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, worstCase:Number(v)}; setLocal(c); }} /></Td>
                  <Td>{expected.toFixed(2)}</Td>
                  <Td width={25}><TextInput value={t.notes ?? ''} onChange={(_,v)=>{ const c=[...local]; c[i]={...t, notes:v}; setLocal(c); }} /></Td>
                  <Td><Button variant="link" onClick={()=> setLocal(local.filter(x=>x.id!==t.id))}>Remove</Button></Td>
                </Tr>
              );
            })}
          </Tbody>
        </TableComposable>
      </CardBody>
      <CardFooter><Button onClick={save} variant="primary">Save tasks</Button></CardFooter>
    </Card>
  );
}