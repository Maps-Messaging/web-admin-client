import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'cpu' },
  { key: 'authentication', title: 'Authentication', href: paths.dashboard.authentication, icon: 'lock' },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'repeat' },
  { key: 'discovery', title: 'Discovery', href: paths.dashboard.discovery, icon: 'magnifying-glass' },
  { key: 'namespace', title: 'Namespace', href: paths.dashboard.namespace, icon: 'folder' },
  { key: 'network', title: 'Network', href: paths.dashboard.network, icon: 'network' },
  { key: 'connections', title: 'Connections', href: paths.dashboard.connections, icon: 'plugs-connected' },
  { key: 'schema', title: 'Schema', href: paths.dashboard.schemas, icon: 'database' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'monitor', title: 'Monitor', href: paths.dashboard.monitor, icon: 'monitor' },
] satisfies NavItemConfig[];
