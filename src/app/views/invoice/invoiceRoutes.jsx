import Loadable from 'app/components/Loadable';

import { lazy } from 'react';

const InvoiceForm = Loadable(lazy(() => import('./invoices/invoiceForm')));
// const EditLead = Loadable(lazy(() => import('./leads/editLead')));

const invoiceRoutes = [
  { path: '/invoices/invoiceForm', element: <InvoiceForm /> },
  //{ path: '/leads/editLead', element: <EditLead /> },
];

export default invoiceRoutes;
