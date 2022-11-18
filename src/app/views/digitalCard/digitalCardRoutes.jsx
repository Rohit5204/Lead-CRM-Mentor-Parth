import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageDigitalCard = Loadable(lazy(() => import('./digitalCards/managedigitalCard')));
const AddFormCard = Loadable(lazy(() => import('./digitalCards/addDigitalCard')));


const digitalCardRoutes = [
    { path: '/digitalCards/managedigitalCard', element: <ManageDigitalCard /> },
    { path: '/digitalCards/addDigitalCard', element: <AddFormCard /> },

];

export default digitalCardRoutes;
