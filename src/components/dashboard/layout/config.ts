import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'cpu' },
  { key: 'authentication', title: 'Authentication', href: paths.dashboard.authentication, icon: 'user' },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'namespace', title: 'Namespace', href: paths.dashboard.namespace, icon: 'folder' },
  { key: 'network', title: 'Network', href: paths.dashboard.network, icon: 'folder' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'monitor', title: 'Monitor', href: paths.dashboard.monitor, icon: 'gear-six' },
] satisfies NavItemConfig[];
