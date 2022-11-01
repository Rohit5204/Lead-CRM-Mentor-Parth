import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const InvoiceForm = Loadable(lazy(() => import('./invoices/invoiceForm')));
const ManageInvoiceList = Loadable(lazy(() => import('./invoices/ManageInvoiceList')));

const invoiceRoutes = [
  { path: '/invoices/invoiceForm', element: <InvoiceForm /> },
  { path: '/invoices/ManageInvoiceList', element: <ManageInvoiceList /> },
];

export default invoiceRoutes;
