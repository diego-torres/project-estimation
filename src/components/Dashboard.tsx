import React from "react";
import { Button, Card, CardBody } from "@patternfly/react-core";
import { Bullseye, Title } from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => (
  <Bullseye>
    <Card style={{ minWidth: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardBody>
        <Title headingLevel="h1" size="2xl">Project Estimation App</Title>
        <p style={{ marginTop: 16, fontSize: '1.1rem', color: '#444' }}>
          Welcome! This application helps you create, manage, and share project estimates using proven methodologies like PERT. Start a new project or explore templates to get going.
        </p>
        <Button variant="primary" style={{ marginTop: 24 }} href="/projects/new">
          Start New Project
        </Button>
        <Button variant="link" style={{ marginLeft: 8 }} href="/templates">
          Browse Templates
        </Button>
      </CardBody>
    </Card>
  </Bullseye>
);

export default Dashboard;

