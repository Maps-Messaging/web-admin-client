import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'cpu' },
  { key: 'monitor', title: 'Monitor', href: paths.dashboard.monitor, icon: 'monitor' },
  {
    key: 'server',
    title: 'Server Management',
    icon: 'computer',
    items: [
      { key: 'authentication', title: 'Authentication', href: paths.dashboard.authentication, icon: 'lock' },
      { key: 'hardware', title: 'Hardware', href: paths.dashboard.hardware, icon: 'circuit' },
      { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' }
    ]
  },
  {
    key: 'data',
    title: 'Data Management',
    icon: 'archive',
    items: [
      { key: 'namespace', title: 'Namespace', href: paths.dashboard.namespace, icon: 'folder' },
      { key: 'schema', title: 'Schema', href: paths.dashboard.schemas, icon: 'database' }
    ]
  },
  {
    key: 'communications',
    title: 'Communications',
    icon: 'globe',
    items: [
      { key: 'interfaces', title: 'Interfaces', href: paths.dashboard.network, icon: 'network' },
      { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'repeat' },
      { key: 'connections', title: 'Connections', href: paths.dashboard.connections, icon: 'plugs-connected' },
      { key: 'lora', title: 'LoRa', href: paths.dashboard.lora, icon: 'lora' },
      { key: 'discovery', title: 'Discovery', href: paths.dashboard.discovery, icon: 'magnifying-glass' }
    ]
  }

] satisfies NavItemConfig[];
