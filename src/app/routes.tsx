import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { NotFound } from '@app/NotFound/NotFound';
import { ProjectsList, NewProject, ProjectDetail } from '../components/projects';
import { TemplatesList, TemplateEditor } from '../components/templates';
import { DB } from '../models/types';

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  element: React.ReactElement;
  exact?: boolean;
  path: string;
  title: string;
}

export type AppRouteConfig = IAppRoute;

export const getRoutes = (
  db: DB | null,
  persist: ((u: (d: DB) => void) => void) | null,
): AppRouteConfig[] => [
  {
    element: <Dashboard />,
    exact: true,
    label: 'Dashboard',
    path: '/',
    title: 'Estimator | Dashboard',
  },
  {
    element: db ? <ProjectsList db={db} /> : <></>,
    exact: true,
    label: 'Projects',
    path: '/projects',
    title: 'Estimator | Projects',
  },
  {
    element: db && persist ? <NewProject db={db} persist={persist} /> : <></>,
    exact: true,
    path: '/projects/new',
    title: 'Estimator | New Project',
  },
  {
    element: db ? <ProjectDetail db={db} /> : <></>,
    exact: true,
    path: '/projects/:id',
    title: 'Estimator | Project Detail',
  },
  {
    element: db ? (
      <TemplatesList db={db} onClone={(id) => { window.location.href = `/projects/new?templateId=${id}`; }} />
    ) : (
      <></>
    ),
    exact: true,
    label: 'Templates',
    path: '/templates',
    title: 'Estimator | Templates',
  },
  {
    element: db && persist ? <TemplateEditor db={db} persist={persist} /> : <></>,
    exact: true,
    path: '/templates/:id',
    title: 'Estimator | Template Editor',
  },
];

export const AppRoutes = ({ routes }: { routes: AppRouteConfig[] }): React.ReactElement => (
  <Routes>
    {routes.map(({ path, element }, idx) => (
      <Route path={path} element={element} key={idx} />
    ))}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
