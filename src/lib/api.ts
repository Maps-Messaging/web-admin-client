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
// src/lib/api.ts
import axios, { AxiosError } from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    const axErr = error as AxiosError;

    const status = axErr.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem('custom-auth-token');
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      } catch {
        // ignore storage errors
      }
      window.location.href = '/auth';
    }

    // eslint prefers rejecting an Error instance
    return Promise.reject(axErr instanceof Error ? axErr : new Error('Request failed'));
  }
);

export default api;
