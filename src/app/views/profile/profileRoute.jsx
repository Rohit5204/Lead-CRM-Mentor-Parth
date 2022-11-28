import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageProfile = Loadable(lazy(() => import('./profile')));
const ManageAllProfile = Loadable(lazy(() => import('./manageProfile')));

const profileRoutes = [
    { path: '/profile', element: <ManageProfile /> },
    { path: '/manageProfile', element: <ManageAllProfile /> },

];

export default profileRoutes;