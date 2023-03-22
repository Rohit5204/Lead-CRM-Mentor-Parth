import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const InvoiceForm = Loadable(lazy(() => import('./invoices/invoiceForm')));
const AddInvoice = Loadable(lazy(() => import('./invoices/addInvoice')));
const AddLeadInvoice = Loadable(lazy(() => import('./invoices/addleadInvoice')));
const ManageInvoiceList = Loadable(lazy(() => import('./invoices/ManageInvoiceList')));
const UpdateInstallments = Loadable(lazy(() => import('./invoices/updateInstallments')));
const CompletedInvoiceList = Loadable(lazy(() => import('./invoices/completedInvoiceList')));
const ViewLeadInvoice = Loadable(lazy(() => import('./invoices/viewLeadData')));

const invoiceRoutes = [
  { path: '/invoices/invoiceForm', element: <InvoiceForm /> },
  { path: '/invoices/addInvoice', element: <AddInvoice /> },
  { path: '/invoices/addleadInvoice', element: <AddLeadInvoice /> },
  { path: '/invoices/ManageInvoiceList', element: <ManageInvoiceList /> },
  { path: '/invoices/updateInstallments', element: <UpdateInstallments /> },
  { path: '/invoices/completedInvoiceList', element: <CompletedInvoiceList /> },
  { path: '/invoices/viewLeadData', element: <ViewLeadInvoice /> },
];

export default invoiceRoutes;
