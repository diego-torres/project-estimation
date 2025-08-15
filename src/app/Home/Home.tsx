import React from 'react';
import { Banner, Bullseye, Button, Card, CardBody, Title, Tabs, Tab } from '@patternfly/react-core';

const { version } = require('../../../package.json');

const Home: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = React.useState(0);
  const handleTabClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
  setActiveTabKey(Number(eventKey));
  };
  return (
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
          <Title headingLevel="h2" size="lg">Instructions</Title>
          <Tabs isBox activeKey={activeTabKey} onSelect={handleTabClick}>
            <Tab eventKey={0} title="Enablement">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Complete the Consulting Scoping Process and Tooling Enablement Learning Path if new to scoping.
Review the Services Scoping Enablement playlist for refreshers.
For help, use Slack: #help-consulting-project-estimation.`}
              </pre>
            </Tab>
            <Tab eventKey={1} title="Initial offering creation">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Use the latest template at https://red.ht/ConsultingScopingTemplate.
Organize tabs from left to right as you complete them.
Add participants, fill in opportunity info, and normalize the document title.
Check Portfolio Hub for existing offerings and import if applicable.
Complete the Project Complexity Matrix with client input.
Review and write business outcomes, tasks, weekly tasks, legal words to avoid, risks, out of scope items, prerequisites & assumptions, and training recommendations.`}
              </pre>
            </Tab>
            <Tab eventKey={2} title="Estimation">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Recruit at least 3 participants, including SMEs and a "rubber duck" technologist.
Fill out the Scoping Participants tab for LoE Exercise Participants.
Run the scoping exercise to estimate best, worst, and most likely cases for tasks, weekly tasks, and risks.
Refine task language, update risks, out of scope items, and assumptions.`}
              </pre>
            </Tab>
            <Tab eventKey={3} title="Team modeling">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Verify Project Complexity Matrix completion.
Fill out desired roles and metadata in Team Roles tab.
Model the team and review results in Team Modeling and Staffing Plan tabs.
Adjust scope if model does not match time/budget needs.
Do not change task estimates without changing wording or assumptions.`}
              </pre>
            </Tab>
            <Tab eventKey={4} title="Review staffing needs">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Review the Staffing Needs (Output) tab and adjust scope as needed.
The Possible Staffing Plan is a suggestion; use your business knowledge to assess success likelihood.`}
              </pre>
            </Tab>
            <Tab eventKey={5} title="Generating task list document">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Use Red Hat Tools -> Export Client Review Document.`}
              </pre>
            </Tab>
            <Tab eventKey={6} title="Peer review">
              <pre style={{ whiteSpace: 'pre-wrap' }}>
{`Fill out the Scoping Participants tab for Peer Review Participants.
Review participants, outcomes, tasks, weekly tasks, legal words, risks, out of scope items, prerequisites & assumptions, section descriptions, training recommendations, project complexity matrix, team roles, team modeling, and statistics for completeness and flags.`}
              </pre>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export { Home };
