import Loadable from 'app/components/Loadable';

import { lazy } from 'react';


const ManageReward = Loadable(lazy(() => import('./reward/manageReward')));


const rewardRoutes = [
    // { path: '/reward/manageReward', element: <AddCatalogue /> },
    { path: '/reward/manageReward', element: <ManageReward /> },
];

export default rewardRoutes;
