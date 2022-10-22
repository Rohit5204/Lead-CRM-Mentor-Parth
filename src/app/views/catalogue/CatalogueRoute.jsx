import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const AddCatalogue = Loadable(lazy(() => import('./catalogues/addCatalogue')));
const EditCatalogue = Loadable(lazy(() => import('./catalogues/editCatalogue')));
const ManageCatalogue = Loadable(lazy(() => import('./catalogues/manageCatalogue')));

const catalogueRoutes = [
  { path: '/catalogues/addCatalogue', element: <AddCatalogue /> },
  { path: '/catalogues/editCatalogue', element: <EditCatalogue /> },
  { path: '/catalogues/manageCatalogue', element: <ManageCatalogue /> },
];

export default catalogueRoutes;
