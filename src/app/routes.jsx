import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import leadRoutes from './views/lead/LeadRoutes';
import catalogueRoutes from './views/catalogue/CatalogueRoute';
import quotationRoutes from './views/quotation/quotationRoute';
import invoiceRoutes from './views/invoice/invoiceRoutes';
import employeeRoutes from './views/employee/employeeRoutes';
import digitalCardRoutes from './views/digitalCard/digitalCardRoutes';
import systemMasterRoutes from './views/systemMaster/systemMaster';
import profileRoutes from './views/profile/profileRoute';
import myDealRoutes from './views/myDeals/myDealRoutes';
const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...materialRoutes,
      ...leadRoutes,
      ...catalogueRoutes,
      ...quotationRoutes,
      ...invoiceRoutes,
      ...employeeRoutes,
      ...digitalCardRoutes,
      ...systemMasterRoutes,
      ...profileRoutes,
      ...myDealRoutes
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
