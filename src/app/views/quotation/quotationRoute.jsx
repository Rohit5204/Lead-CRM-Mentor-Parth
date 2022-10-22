import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const AddQuotation = Loadable(lazy(() => import('./quotations/addQuotation')));
const EditQuotation = Loadable(lazy(() => import('./quotations/editQuotation')));
const ManageQuotation = Loadable(lazy(() => import('./quotations/manageQuotation')));

const quotationRoutes = [
  { path: '/quotations/addQuotation', element: <AddQuotation /> },
  { path: '/quotations/editQuotation', element: <EditQuotation /> },
  { path: '/quotations/manageQuotation', element: <ManageQuotation /> },
];

export default quotationRoutes;
