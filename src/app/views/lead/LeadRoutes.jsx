import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const LeadForm = Loadable(lazy(() => import('./leads/addLeads')));
const EditLead = Loadable(lazy(() => import('./leads/editLead')));
const ManageLead = Loadable(lazy(() => import('./leads/manageLeads')));

const SystemMaster = Loadable(lazy(() => import('./leads/systemMaster')));
const UserMaster = Loadable(lazy(() => import('./leads/userMaster')));

const Tabs = Loadable(lazy(() => import('./leads/tabs')));
const EditUser = Loadable(lazy(() => import('./leads/editUser')));
const AddUser = Loadable(lazy(() => import('./leads/addUser')));
const Manage = Loadable(lazy(() => import('./leads/manage')));
const leadRoutes = [
  { path: '/leads/addLeads', element: <LeadForm /> },
  { path: '/leads/editLead', element: <EditLead /> },
  { path: '/leads/manageLeads', element: <ManageLead /> },
  { path: '/leads/SystemMaster', element: <SystemMaster /> },
  { path: '/leads/userMaster', element: <UserMaster /> },
  { path: '/leads/tabs', element: <Tabs /> },
  { path: '/leads/editUser', element: <EditUser /> },
  { path: '/leads/addUser', element: <AddUser /> },
  { path: '/leads/manage', element: <Manage /> },
];

export default leadRoutes;
