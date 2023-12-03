import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageLeaderBoard = Loadable(lazy(() => import('./manageLeaderBoard')));

const LeaderBoard = [
    { path: '/manageLeaderBoard', element: <ManageLeaderBoard /> },
];

export default LeaderBoard;
