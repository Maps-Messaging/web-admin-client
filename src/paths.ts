
export const paths = {
  home: `/`,
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    monitor: '/dashboard/monitor',
    users: '/dashboard/authentication/users',
    groups: '/dashboard/authentication/groups',
    namespace: '/dashboard/namespace',
    network: '/dashboard/network',
    connections: '/dashboard/connections',
    integrations: '/dashboard/integrations',
    schemas: '/dashboard/schema',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
