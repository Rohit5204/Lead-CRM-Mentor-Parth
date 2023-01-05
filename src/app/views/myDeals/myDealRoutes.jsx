import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageDeals = Loadable(lazy(() => import('./myDeal/manageDeals')));
const ManageRecovery = Loadable(lazy(() => import('./myDeal/recovery/manageRecovery')));
const EditRecoveryInstallment = Loadable(lazy(() => import('./myDeal/recovery/editRecoveryInstallment')));
const Renewal = Loadable(lazy(() => import('./myDeal/renewal/manageRenewal')));
const ViewRenew = Loadable(lazy(() => import('./myDeal/renewal/viewRenew')));
const myDealRoutes = [
    { path: '/myDeal/manageDeals', element: <ManageDeals /> },
    { path: '/myDeal/recovery/manageRecovery', element: <ManageRecovery /> },
    { path: '/myDeal/recovery/editRecoveryInstallment', element: <EditRecoveryInstallment /> },
    { path: '/myDeal/renewal/manageRenewal', element: <Renewal /> },
    { path: '/myDeal/renewal/viewRenew', element: <ViewRenew /> },
];

export default myDealRoutes;