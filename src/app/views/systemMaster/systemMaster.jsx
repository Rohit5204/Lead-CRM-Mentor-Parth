import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageMaster = Loadable(lazy(() => import('./manageSystemMaster')));

const systemMasterRoutes = [
    { path: '/manageSystemMaster', element: <ManageMaster /> },
];

export default systemMasterRoutes;
