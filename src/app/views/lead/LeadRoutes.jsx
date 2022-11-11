import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const LeadForm = Loadable(lazy(() => import('./leads/addLeads')));
const EditLead = Loadable(lazy(() => import('./leads/editLead')));
const ManageLead = Loadable(lazy(() => import('./leads/manageLeads')));
const ViewLead = Loadable(lazy(() => import('./leads/viewLeads')));
const AssignLeads = Loadable(lazy(() => import('./leads/assignLeads')));

const leadRoutes = [
  { path: '/leads/addLeads', element: <LeadForm /> },
  { path: '/leads/editLead', element: <EditLead /> },
  { path: '/leads/viewLeads', element: <ViewLead /> },
  { path: '/leads/manageLeads', element: <ManageLead /> },
  { path: '/leads/assignLeads', element: <AssignLeads /> },
];

export default leadRoutes;
