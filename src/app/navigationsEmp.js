import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
export const navigationEmp = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // { name: 'Employee Dashboard', path: '/dashboard/employeeDashboard', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },

  { name: 'Manage Leads', path: '/leads/manageLeads', icon: 'send' },
  // { name: 'Profit/Loss Trader', icon: 'work', path: '/leads/manageTrader' },


  { name: 'Catalogue List', path: '/catalogues/userCatalogue', icon: 'work' },
  { name: 'Reward', path: '/reward/manageReward', icon: <EmojiEventsIcon /> },

  {
    name: 'Attendance',
    icon: 'person',
    children: [
      { name: 'View Attendance', iconText: 'ML', path: '/manageAttandance' },
      // { name: 'Add Lead', iconText: 'SI', path: '/leads/addLeads' },
      { name: 'Leave Request', iconText: 'LR', path: '/manageLeave' },
    ],
  },
  // { label: 'QUOTATIONS', type: 'label' },
  // { name: 'Quotation List', path: '/quotations/manageQuotation', icon: 'work' },

  // { label: 'Email Template', type: 'label' },
  // {
  //   name: 'Email',
  //   icon: 'email',
  //   path: '/manageEmailMessage',
  // },
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
