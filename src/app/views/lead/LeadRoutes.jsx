import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const LeadForm = Loadable(lazy(() => import('./leads/addLeads')));
const ManageLead = Loadable(lazy(() => import('./leads/manageLeads')));
const EditUser = Loadable(lazy(() => import('./leads/editUser')));
const AddUser = Loadable(lazy(() => import('./leads/editUser')));
const UserMaster = Loadable(lazy(() => import('./leads/userMaster')));
const Tabs = Loadable(lazy(() => import('./leads/tabs')));
const leadRoutes = [
  { path: '/leads/addLeads', element: <LeadForm /> },
  { path: '/leads/manageLeads', element: <ManageLead /> },
  { path: '/leads/editUser', element: <EditUser /> },
  { path: '/leads/addUser', element: <AddUser /> },
  { path: '/leads/userMaster', element: <UserMaster /> },
  { path: '/leads/tabs', element: <Tabs /> },
];

export default leadRoutes;
