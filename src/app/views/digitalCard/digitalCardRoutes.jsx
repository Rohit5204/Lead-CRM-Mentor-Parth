import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageDigitalCard = Loadable(lazy(() => import('./digitalCards/managedigitalCard')));
const ProfilePage = Loadable(lazy(() => import('./digitalCards/addDigitalCard')));
const ProfileStatistics = Loadable(lazy(() => import('./digitalCards/viewDigitalCard')));

const digitalCardRoutes = [
    { path: '/digitalCards/managedigitalCard', element: <ManageDigitalCard /> },
    { path: '/digitalCards/addDigitalCard', element: <ProfilePage /> },
    { path: '/digitalCards/viewDigitalCard', element: <ProfileStatistics /> },
];

export default digitalCardRoutes;
