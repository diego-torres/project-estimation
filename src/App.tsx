import React, { useEffect } from "react";
import AppShell from "./components/AppShell";
import Dashboard from "./components/Dashboard";
import { TemplatesList, TemplateEditor } from "./components/templates";
import { ProjectsList, NewProject, ProjectDetail } from "./components/projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bullseye, Spinner } from "@patternfly/react-core";
import { useDB } from "./lib/db";

export default function App() {

  const { db, persist } = useDB();
  const onClone = (templateId: string) => {
    window.location.href = `/projects/new?templateId=${templateId}`;
  };

  useEffect(() => {
    console.log("App component mounted");
    console.log("Current URL:", window.location.href);
    console.log("DB loaded:", !!db);
    console.log("Persist loaded:", !!persist);
  }, [db, persist]);

  return (
    <BrowserRouter>
      <AppShell>
        <div style={{ padding: "1rem", background: "#f5f5f5" }}>
          <h2>Landing Page Loaded</h2>
          <p>Check the browser console for debug logs.</p>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/templates" element={db ? <TemplatesList db={db} onClone={onClone} /> : null} />
          <Route path="/templates/:id" element={db && persist ? <TemplateEditor db={db} persist={persist} /> : null} />
          <Route path="/projects" element={db ? <ProjectsList db={db} /> : null} />
          <Route path="/projects/new" element={db && persist ? <NewProject db={db} persist={persist} /> : null} />
          <Route path="/projects/:id" element={db && persist ? <ProjectDetail db={db} persist={persist} /> : null} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}