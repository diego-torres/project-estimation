import React from "react";
import { Nav, NavItem, NavList, Page, PageHeader, PageSection, PageSidebar, Title } from "@patternfly/react-core";
import { useLocation } from "react-router-dom";

function useActivePath() {
  const loc = useLocation();
  return loc.pathname;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const active = useActivePath();
  const nav = (
    <Nav theme="dark">
      <NavList>
        <NavItem isActive={active === "/"} to="/">Dashboard</NavItem>
        <NavItem isActive={active.startsWith("/projects")} to="/projects">Projects</NavItem>
        <NavItem isActive={active.startsWith("/templates")} to="/templates">Templates</NavItem>
      </NavList>
    </Nav>
  );

  return (
    <Page header={<PageHeader logo={<Title headingLevel="h3">Consulting Estimator</Title>} />} sidebar={<PageSidebar nav={nav} isSidebarOpen />} isManagedSidebar>
      <PageSection isFilled>{children}</PageSection>
    </Page>
  );
}