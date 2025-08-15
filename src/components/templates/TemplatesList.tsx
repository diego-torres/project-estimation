import React, { useState } from "react";
import {
  Modal,
  Form,
  FormGroup,
  ActionGroup,
  ModalVariant,
  Button,
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  PageSection,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { ExclamationTriangleIcon, EditAltIcon, CloneIcon } from "@patternfly/react-icons";
import { api } from "../../lib/api";
import { RepoRef } from "../../lib/github";
import { ProjectTemplate, uid } from "../../models/types";

interface LoadedTemplate {
  repo: RepoRef;
  template: ProjectTemplate;
}

export default function TemplatesList() {
  const [repo, setRepo] = useState("");
  const [templates, setTemplates] = useState<LoadedTemplate[]>([]);
  const [creating, setCreating] = useState<RepoRef | null>(null);
  const [editing, setEditing] = useState<LoadedTemplate | null>(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const load = async () => {
    const [owner, name] = repo.split("/");
    if (!owner || !name) return;
    const template = await api.getTemplate({ owner, repo: name });
    if (!template.id) {
      setCreating({ owner, repo: name });
      setNewName("");
      setNewDesc("");
      setIsModalOpen(true);
      return;
    }
    setTemplates((prev) => [
      ...prev,
      { repo: { owner, repo: name }, template },
    ]);
    const meta = await api.loadMeta();
    const recents = [
      `${owner}/${name}`,
      ...meta.recents.filter((r) => r !== `${owner}/${name}`),
    ].slice(0, 5);
    await api.saveMeta({ recents });
  };

  const handleClone = async (t: LoadedTemplate) => {
    const dest = window.prompt("Destination repo (owner/name)");
    if (!dest) return;
    const [owner, name] = dest.split("/");
    if (!owner || !name) return;
    await api.copyTemplate(t.repo, { owner, repo: name });
  };

  const handleEdit = (t: LoadedTemplate) => {
    setEditing(t);
    setNewName(t.template.name);
    setNewDesc(t.template.description || "");
    setIsModalOpen(true);
  };

  return (
    <PageSection>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <TextInput
              aria-label="template repository"
              value={repo}
              onChange={(_event, value) => setRepo(value)}
              placeholder="owner/repo"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={load}>Load template</Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Modal
        title={editing ? "Edit Template" : "Create Template"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCreating(null);
          setEditing(null);
          setNewName("");
          setNewDesc("");
        }}
        variant={ModalVariant.medium}
      >
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            if (editing) {
              const updated: ProjectTemplate = {
                ...editing.template,
                name: newName,
                description: newDesc,
              };
              await api.saveTemplate(editing.repo, updated);
              setTemplates((prev) =>
                prev.map((t) =>
                  t.repo.owner === editing.repo.owner &&
                  t.repo.repo === editing.repo.repo
                    ? { repo: editing.repo, template: updated }
                    : t,
                ),
              );
              setEditing(null);
            } else if (creating) {
              const template: ProjectTemplate = {
                id: uid(),
                name: newName,
                description: newDesc,
                defaults: {},
              };
              await api.initTemplate(creating, template);
              setTemplates((prev) => [...prev, { repo: creating, template }]);
              const meta = await api.loadMeta();
              const recents = [
                `${creating.owner}/${creating.repo}`,
                ...meta.recents.filter((r) => r !== `${creating.owner}/${creating.repo}`),
              ].slice(0, 5);
              await api.saveMeta({ recents });
              setCreating(null);
            } else {
              return;
            }
            setNewName("");
            setNewDesc("");
            setIsModalOpen(false);
          }}
          isWidthLimited
        >
          <FormGroup label="Template Name" isRequired fieldId="template-name" style={{ marginTop: 62, marginLeft: 40 }}>
            <TextInput
              id="template-name"
              aria-label="template name"
              value={newName}
              onChange={(_e, v) => setNewName(v)}
              placeholder="Template name"
            />
          </FormGroup>
          <FormGroup label="Description" fieldId="template-desc" style={{ marginLeft: 40 }}>
            <TextInput
              id="template-desc"
              aria-label="template description"
              value={newDesc}
              onChange={(_e, v) => setNewDesc(v)}
              placeholder="Description"
            />
          </FormGroup>
          <ActionGroup style={{marginLeft: 40 }}>
            <Button type="submit" variant="primary">
              {editing ? "Save template" : "Create template"}
            </Button>
          </ActionGroup>
        </Form>
      </Modal>
      {templates.length === 0 ? (
        <Bullseye>
          <EmptyState
            titleText="No templates loaded"
            icon={ExclamationTriangleIcon}
          >
            <EmptyStateBody>
              Enter a repository to load a template.
            </EmptyStateBody>
            <EmptyStateFooter>
              <Button onClick={load}>Load template</Button>
            </EmptyStateFooter>
          </EmptyState>
        </Bullseye>
      ) : (
        <table
          role="grid"
          className="pf-v5-c-table"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <caption>Project templates</caption>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Name</th>
              <th>Description</th>
              <th>Repository</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr key={`${t.repo.owner}/${t.repo.repo}`}>
                <td>
                  <Button
                    variant="plain"
                    aria-label="Edit template"
                    onClick={() => handleEdit(t)}
                  >
                    <EditAltIcon />
                  </Button>
                  <Button
                    variant="plain"
                    aria-label="Copy template"
                    onClick={() => handleClone(t)}
                  >
                    <CloneIcon />
                  </Button>
                </td>
                <td>{t.template.name}</td>
                <td>{t.template.description}</td>
                <td>{`${t.repo.owner}/${t.repo.repo}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageSection>
  );
}
