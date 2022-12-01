import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const ManageDigitalCard = Loadable(lazy(() => import('./digitalCards/managedigitalCard')));
const AddFormCard = Loadable(lazy(() => import('./digitalCards/addDigitalCard')));
const EditFormCard = Loadable(lazy(() => import('./digitalCards/editDigitalCard')));
const SampleDigitalCardPreview = Loadable(lazy(() => import('./digitalCards/SampleCard')));

const digitalCardRoutes = [
    { path: '/digitalCards', element: <ManageDigitalCard /> },
    { path: '/digitalCards/addCard', element: <AddFormCard /> },
    { path: '/digitalCards/editCard', element: <EditFormCard /> },
    { path: '/digitalCards/SampleCard', element: <SampleDigitalCardPreview /> },
];

export default digitalCardRoutes;
