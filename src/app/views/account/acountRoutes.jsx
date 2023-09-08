import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageLeave = Loadable(lazy(() => import('./leave/manageLeave')));
const ManageAttendenceReport = Loadable(lazy(() => import('./attendance/attendanceReport')));
const ManageAttandance = Loadable(lazy(() => import('./attendance/manageAttendance')));

const AccountRoutes = [
    { path: '/manageAttandance', element: <ManageAttandance /> },
    { path: '/attandanceReport', element: <ManageAttendenceReport /> },
    { path: '/manageLeave', element: <ManageLeave /> },
];

export default AccountRoutes;
