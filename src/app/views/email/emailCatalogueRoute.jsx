import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageEmailMessage = Loadable(lazy(() => import('./manageEmailMessage')));

const emailRoutes = [
    { path: '/manageEmailMessage', element: <ManageEmailMessage /> },
];

export default emailRoutes;
