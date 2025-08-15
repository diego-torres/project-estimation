import React from 'react';
import { Banner, Bullseye, Button, Card, CardBody, Title } from '@patternfly/react-core';
import { instructions } from './instructions';

const { version } = require('../../../package.json');

const Home: React.FC = () => (
  <>
    <Banner status="info">Consulting Project Estimation</Banner>
    <Bullseye>
      <Card style={{ minWidth: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardBody>
          <Title headingLevel="h1" size="2xl">Project Estimation App</Title>
          <p style={{ marginTop: 8, fontSize: '1rem', color: '#444' }}>Version: {version}</p>
          <p style={{ marginTop: 16, fontSize: '1.1rem', color: '#444' }}>
            Welcome! This application helps you create, manage, and share project estimates using proven
            methodologies like PERT. Start a new project or explore templates to get going.
          </p>
          <p style={{ marginTop: 16 }}>
            Template bugs or enhancements? Submit them on our{' '}
            <a
              href="https://github.com/RedHatConsulting/project-estimation/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub issues
            </a>{' '}
            page.
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
    <Card isPlain style={{ marginTop: 24 }}>
      <CardBody>
        <Title headingLevel="h2" size="lg">
          Instructions
        </Title>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{instructions}</pre>
      </CardBody>
    </Card>
  </>
);

export { Home };
