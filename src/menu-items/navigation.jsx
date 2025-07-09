const icons = {
  dashboard: <i className="ph ph-house-line" />,
  layouts: <i className="ph ph-house-line" />,
  route: <i className="ph ph-path" />
};

const navigation = {
  id: 'group-dashboard-loading-unique',
  title: 'Navigation',
  type: 'group',
  icon: icons.dashboard,
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: icons.dashboard,
      url: '/'
    },
    {
      id: 'analysis',
      title: 'Route Analysis',
      type: 'item',
      icon: icons.route,
      url: '/route-analysis'
    }
  ]
};

export default navigation;
