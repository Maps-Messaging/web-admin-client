import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'cpu' },
  {
    key: 'authentication',
    title: 'Authentication',
    icon: 'lock',
    items: [
      { key: 'users', title: 'Users', href: paths.dashboard.users, icon: 'user' },
      { key: 'groups', title: 'Groups', href: paths.dashboard.groups, icon: 'group' }
    ]
  },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'namespace', title: 'Namespace', href: paths.dashboard.namespace, icon: 'folder' },
  { key: 'network', title: 'Network', href: paths.dashboard.network, icon: 'folder' },
  { key: 'connections', title: 'Connections', href: paths.dashboard.connections, icon: 'folder' },
  { key: 'schema', title: 'Schema', href: paths.dashboard.schemas, icon: 'gear-six' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'monitor', title: 'Monitor', href: paths.dashboard.monitor, icon: 'gear-six' },
] satisfies NavItemConfig[];
