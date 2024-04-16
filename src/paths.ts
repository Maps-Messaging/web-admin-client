
export const paths = {
  home: `/`,
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    authentication: '/dashboard/authentication',
    namespace: '/dashboard/namespace',
    network: '/dashboard/network',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    monitor: '/dashboard/monitor',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
