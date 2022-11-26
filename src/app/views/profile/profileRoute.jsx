import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageProfile = Loadable(lazy(() => import('./profile')));

const profileRoutes = [
    { path: '/profile', element: <ManageProfile /> },

];

export default profileRoutes;