
export const paths = {
  home: `/`,
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    authentication: '/dashboard/authentication',
    groups: '/dashboard/authentication/groups',
    discovery: '/dashboard/discovery',
    monitor: '/dashboard/monitor',
    namespace: '/dashboard/namespace',
    network: '/dashboard/network',
    connections: '/dashboard/connections',
    integrations: '/dashboard/integrations',
    schemas: '/dashboard/schema',
    settings: '/dashboard/settings',
  }
} as const;
