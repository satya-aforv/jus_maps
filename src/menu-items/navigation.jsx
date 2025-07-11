const icons = {
  dashboard: <i className="ph ph-house-line" />,
  layouts: <i className="ph ph-house-line" />,
  route: <i className="ph ph-path" />,
  route_analysis: <i className="ph ph-path" />
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
      title: 'Routes',
      type: 'item',
      icon: icons.route,
      url: '/routes'
    }
    // {
    //   id: 'route-analysis',
    //   title: 'Routes',
    //   type: 'item',
    //   icon: icons.route_analysis,
    //   url: '/routes'
    // }
  ]
};

export default navigation;
