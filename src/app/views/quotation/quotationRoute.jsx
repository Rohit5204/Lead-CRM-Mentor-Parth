import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const AddQuotation = Loadable(lazy(() => import('./quotations/addQuotation')));
const EditQuotation = Loadable(lazy(() => import('./quotations/editQuotation')));
const ManageQuotation = Loadable(lazy(() => import('./quotations/manageQuotation')));
const CompletedManageQuotation = Loadable(lazy(() => import('./quotations/completedQuotationList')));

const quotationRoutes = [
  { path: '/quotations/addQuotation', element: <AddQuotation /> },
  { path: '/quotations/editQuotation', element: <EditQuotation /> },
  { path: '/quotations/manageQuotation', element: <ManageQuotation /> },
  { path: '/quotations/completedQuotationList', element: <CompletedManageQuotation /> },
];

export default quotationRoutes;
