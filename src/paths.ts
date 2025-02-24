
/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export const paths = {
  home: `/`,
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    authentication: '/dashboard/authentication',
    hardware: '/dashboard/hardware',
    discovery: '/dashboard/discovery',
    monitor: '/dashboard/monitor',
    namespace: '/dashboard/namespace',
    network: '/dashboard/network',
    connections: '/dashboard/connections',
    lora: '/dashboard/lora',
    integrations: '/dashboard/integrations',
    schemas: '/dashboard/schema',
    settings: '/dashboard/settings',
  }
} as const;
