import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },

  {
    name: 'Lead',
    icon: 'send',
    children: [
      { name: 'Manage Leads', iconText: 'ML', path: '/leads/manageLeads' },
      // { name: 'Add Lead', iconText: 'SI', path: '/leads/addLeads' },
      { name: 'Assign Leads', iconText: 'AL', path: '/leads/assignLeads' },
    ],
  },
  { name: 'Quotation', path: '/quotations/manageQuotation', icon: 'work' },

  // {
  //   name: 'Quotation List',
  //   icon: 'work',
  //   children: [
  //     { name: 'Request For Quotation', path: '/quotations/addQuotation', iconText: 'A' },
  //     { name: 'Draft List', path: '/quotations/manageQuotation', iconText: 'B' },
  //     { name: 'Send List', path: '/quotations/completedQuotationList', iconText: 'C' },
  //   ],
  // },

  { name: 'Invoice', path: '/invoices/ManageInvoiceList', icon: 'receipt' },
  // {
  //   name: 'Invoive',
  //   icon: 'receipt',
  //   children: [
  //     { name: 'Draft Invoice List', iconText: 'SI', path: '/invoices/ManageInvoiceList' },
  //     { name: 'Completed List', iconText: 'SI', path: '/invoices/completedInvoiceList' },
  //     { name: 'Add Invoice', iconText: 'SI', path: 'invoices/addInvoice' },
  //   ],
  // },
  {
    name: 'My Deals',
    icon: 'security',
    children: [
      { name: 'Closed Lead', iconText: 'SI', path: '/myDeal/manageDeals' },
      { name: 'Recovery', iconText: 'SI', path: '/myDeal/recovery/manageRecovery' },
      { name: 'Renewal', iconText: 'SI', path: '/myDeal/renewal/manageRenewal' },
    ],
  },
  {
    name: 'Email',
    icon: 'email',
    path: '/manageEmailMessage',
  },

  // { label: 'Digital Card', type: 'label' },
  // {
  //   name: 'Digital Card',
  //   icon: 'sd_card', path: '/digitalCards'

  // },

  {
    name: 'Setting',
    icon: 'settings_applications',
    children: [
      { name: 'System Master', iconText: 'SM', path: '/manageSystemMaster' },
      { name: 'User Master', iconText: 'EM', path: '/employees/manageAllEmployee' },
      { name: 'Catalogue', iconText: 'CM', path: '/catalogues/manageCatalogue' },
    ],
  },

  { name: 'Reward', path: '/reward/manageReward', icon: <EmojiEventsIcon /> },

  {
    name: 'Attendance',
    icon: 'person',
    children: [
      { name: 'Attendance Report', iconText: 'AR', path: '/attandanceReport' },
      // { name: 'Add Lead', iconText: 'SI', path: '/leads/addLeads' },
      { name: 'Leave Request', iconText: 'LR', path: '/manageLeave' },
    ],
  },

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
