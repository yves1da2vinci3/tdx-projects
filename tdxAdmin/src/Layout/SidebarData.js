import {
    IconBellRinging,
    IconPhoneCall,
    IconBook,
    IconSettingsAutomation,
    IconReceipt2,
   IconUserCircle,
   IconWallet,
   IconReceipt,
   IconMailbox,
   IconDashboard,
   IconMaskOff
  } from '@tabler/icons';
  const data = [
    { link: '/admin/home', label: 'Dashboard', icon: IconDashboard },
    { link: '/admin/notifications', label: 'Notifications', icon: IconBellRinging },
    { link: '/admin/tickers', label: 'Tickers', icon: IconReceipt2 },
    { link: '/admin/user', label: 'User Administration', icon: IconUserCircle },
    { link: '/admin/transactions', label: 'Transactions', icon: IconWallet },
    { link: '/admin/orders', label: 'Orders', icon: IconReceipt },
    { link: '/admin/articles', label: 'Articles', icon: IconBook },
    { link: '/admin/calls', label: 'Calls', icon: IconPhoneCall },
    { link: '/admin/issues', label: 'issues', icon: IconMailbox },
    { link: '/admin/requests', label: 'requests', icon: IconMaskOff },
    { link: '/admin/settings', label: 'settings', icon: IconSettingsAutomation },
  ];
  
export default data
