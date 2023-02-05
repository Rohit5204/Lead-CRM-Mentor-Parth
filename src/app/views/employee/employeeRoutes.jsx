import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const AddEmployee = Loadable(lazy(() => import('./employees/addEmployee')));
const EditEmployee = Loadable(lazy(() => import('./employees/editEmployee')));
const ManageEmployee = Loadable(lazy(() => import('./employees/manageEmployee')));
const ManageAllEmployee = Loadable(lazy(() => import('./employees/manageAllEmployee')));


const employeeRoutes = [
  { path: '/employees/addEmployee', element: <AddEmployee /> },
  { path: '/employees/editEmployee', element: <EditEmployee /> },
  { path: '/employees/manageEmployee', element: <ManageEmployee /> },
  { path: '/employees/manageAllEmployee', element: <ManageAllEmployee /> },
];

export default employeeRoutes;
