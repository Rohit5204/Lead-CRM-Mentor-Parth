import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageDeals = Loadable(lazy(() => import('./myDeal/manageDeals')));
const Recovery = Loadable(lazy(() => import('./myDeal/recovery')));
const Renewal = Loadable(lazy(() => import('./myDeal/renewal')));
const myDealRoutes = [
    { path: '/myDeal/manageDeals', element: <ManageDeals /> },
    { path: '/myDeal/recovery', element: <Recovery /> },
    { path: '/myDeal/renewal', element: <Renewal /> },
];

export default myDealRoutes;