import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const EmployeeDashboard = Loadable(lazy(() => import('./EmployeeDashboard')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  {
    path: '/dashboard/employeeDashboard',
    element: <EmployeeDashboard />,
    auth: authRoles.editor,
  },
];

export default dashboardRoutes;
