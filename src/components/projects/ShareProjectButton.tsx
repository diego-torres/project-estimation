import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Chip, ChipGroup, Modal, ModalVariant, Title } from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { ShareSquareIcon } from "@patternfly/react-icons";
import { Sharing, User } from "../../models/types";

export default function ShareProjectButton({ users, sharing, onSave }: { users: User[]; sharing: Sharing; onSave: (s:Sharing)=>void }) {
  const [isOpen, setOpen] = useState(false);
  const [loc, setLoc] = useState<Sharing>(sharing);
  useEffect(()=>setLoc(sharing),[sharing]);

  const lists: { key: keyof Sharing; label: string }[] = [
    { key: 'owners', label: 'Owners' },
    { key: 'participants', label: 'Participants' },
    { key: 'taskLeads', label: 'Task Leads' },
    { key: 'taskParticipants', label: 'Task Participants' },
    { key: 'taskShadows', label: 'Task Shadows' },
    { key: 'effortFacilitators', label: 'Level of Effort Facilitators' },
    { key: 'effortParticipants', label: 'Level of Effort Participants' },
    { key: 'effortShadows', label: 'Level of Effort Shadows' },
    { key: 'peerParticipants', label: 'Peer Review Participants' },
    { key: 'peerShadows', label: 'Peer Review Shadows' },
  ];

  function toggleUser(list: keyof Sharing, userId: string) {
    setLoc(prev => ({ ...prev, [list]: prev[list].includes(userId) ? prev[list].filter(id => id!==userId) : [...prev[list], userId] }));
  }

  function save() { onSave(loc); setOpen(false); }

  return (
    <>
      <Button icon={<ShareSquareIcon />} onClick={()=>setOpen(true)}>Share</Button>
      <Modal title="Share project & assign roles" isOpen={isOpen} variant={ModalVariant.large} onClose={()=>setOpen(false)} actions={[<Button key="save" onClick={save}>Save</Button>, <Button key="cancel" variant="link" onClick={()=>setOpen(false)}>Cancel</Button>] }>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <div>
            <Title headingLevel="h3">Users</Title>
            <TableComposable aria-label="users" variant="compact">
              <Thead><Tr><Th>Name</Th><Th>Email</Th></Tr></Thead>
              <Tbody>{users.map(u => (<Tr key={u.id}><Td>{u.name}</Td><Td>{u.email}</Td></Tr>))}</Tbody>
            </TableComposable>
          </div>
          <div>
            {lists.map(l => (
              <Card key={l.key} isCompact className="mb-3">
                <CardTitle>{l.label}</CardTitle>
                <CardBody>
                  <ChipGroup>
                    {users.map(u => (
                      <Chip key={u.id} isReadOnly={false} isOverflowChip={false} isSelected={(loc[l.key] as string[]).includes(u.id)} onClick={()=>toggleUser(l.key, u.id)} selectable>
                        {u.name}
                      </Chip>
                    ))}
                  </ChipGroup>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}