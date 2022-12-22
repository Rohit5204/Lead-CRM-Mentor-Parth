export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // { name: 'Employee Dashboard', path: '/dashboard/employeeDashboard', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },
  { label: 'LEADS', type: 'label' },
  {
    name: 'Leads',
    icon: 'send',
    children: [
      { name: 'View All Leads', iconText: 'SU', path: '/leads/manageLeads' },
      { name: 'Add Lead', iconText: 'SI', path: '/leads/addLeads' },
      { name: 'Assign Leads', iconText: 'FP', path: '/leads/assignLeads' },
      { name: 'System Master', iconText: '404', path: '/manageSystemMaster' },
      { name: 'User Master', iconText: '404', path: '/employees/manageEmployee' },
    ],
  },
  { label: 'Catalogue', type: 'label' },
  {
    name: 'Catalogue List',
    icon: 'menu',
    children: [
      { name: 'Manage Catalogue', path: '/catalogues/manageCatalogue', iconText: 'B' },
      { name: 'Add Catalogue', path: '/catalogues/addCatalogue', iconText: 'A' },
    ],
  },
  { label: 'QUOTATIONS', type: 'label' },
  {
    name: 'Quotation List',
    icon: 'work',
    children: [
      { name: 'Request For Quotation', path: '/quotations/addQuotation', iconText: 'A' },
      { name: 'Draft', path: '/quotations/manageQuotation', iconText: 'B' },
      { name: 'Send', path: '/material/checkbox', iconText: 'C' },
    ],
  },
  { name: 'Add Quotation', path: '/quotations/addQuotation', icon: 'book' },
  { label: 'INVOICE', type: 'label' },
  {
    name: 'Invoive',
    icon: 'receipt',
    children: [
      { name: 'Send Quotation List', iconText: 'SI', path: '/invoices/ManageInvoiceList' },
      { name: 'Completed', iconText: 'SI', path: '/' },
      { name: 'Add Invoice', iconText: 'SI', path: 'invoices/addInvoice' },
    ],
  },
  { label: 'Digital Card', type: 'label' },
  {
    name: 'Digital Card',
    icon: 'sd_card',
    children: [
      { name: 'Manage Card', iconText: 'SI', path: '/digitalCards' },
      { name: 'Add Card', iconText: 'SI', path: '/digitalCards/addCard' },
    ],
  },
  { label: 'MY DEALS', type: 'label' },
  {
    name: 'Deals',
    icon: 'security',
    children: [
      { name: 'Completed (Invoive)', iconText: 'SI', path: '/myDeal/manageDeals' },
      { name: 'Recovery', iconText: 'SI', path: '/myDeal/recovery' },
      { name: 'Renewal', iconText: 'SI', path: '/myDeal/renewal' },
    ],
  },
  // { label: 'EMAIL', type: 'label' },
  // {
  //   name: 'Email',
  //   icon: 'security',
  //   children: [
  //     { name: 'Send Mail', iconText: 'SI', path: '/session/signup' },
  //     { name: 'Email Catalog', iconText: 'SI', path: '/session/signup' },
  //   ],
  // },
  // { label: 'REPORTS', type: 'label' },
  // {
  //   name: 'Report',
  //   icon: 'security',
  //   children: [
  //     { name: 'Employee Wise', iconText: 'SI', path: '/session/signup' },
  //     { name: 'Duration Wise', iconText: 'SI', path: '/session/signup' },
  //     { name: 'Product Service Wise', iconText: 'SI', path: '/session/signup' },
  //   ],
  // },

  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
