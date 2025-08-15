import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes, getRoutes } from '@app/routes';
import { useDB } from '../lib/db';
import '@app/app.css';

const App: React.FunctionComponent = () => {
  const { db, persist } = useDB();
  const routes = getRoutes(db, persist);

  return (
    <Router>
      <AppLayout routes={routes}>
        <AppRoutes routes={routes} />
      </AppLayout>
    </Router>
  );
};

export default App;
