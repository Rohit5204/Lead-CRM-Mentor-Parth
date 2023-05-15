import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const LeadForm = Loadable(lazy(() => import('./leads/addLeads')));
const EditLead = Loadable(lazy(() => import('./leads/editLead')));
const ManageLead = Loadable(lazy(() => import('./leads/manageLeads')));
const ViewLead = Loadable(lazy(() => import('./leads/viewLeads')));
const AssignLeads = Loadable(lazy(() => import('./leads/assignLeads')));
const TransactionLeads = Loadable(lazy(() => import('./leads/transaction/addTransaction')));
const ManageTrader = Loadable(lazy(() => import('./leads/traders/manageTrader')));

const leadRoutes = [
  { path: '/leads/addLeads', element: <LeadForm /> },
  { path: '/leads/editLead', element: <EditLead /> },
  { path: '/leads/viewLeads', element: <ViewLead /> },
  { path: '/leads/manageLeads', element: <ManageLead /> },
  { path: '/leads/assignLeads', element: <AssignLeads /> },
  { path: '/leads/transaction/addTransaction', element: <TransactionLeads /> },

  { path: '/leads/manageTrader', element: <ManageTrader /> },
];

export default leadRoutes;
