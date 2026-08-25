/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { fetchClient } from "@/api/api-client";
import type { components } from "@/api/spec";

type Listener = () => void;

type AuthUser = components["schemas"]["LoginResponse"];

export class AuthService {
  private user?: AuthUser;
  private listeners = new Set<Listener>();

  private notify = () => {
    for (const listener of this.listeners) listener();
  };

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.user;

  login = async (
    loginData: components["schemas"]["LoginRequest"],
  ): Promise<void> => {
    const { data, error } = await fetchClient.POST("/api/v1/login", {
      body: loginData,
    });
    if (error) {
      this.user = undefined;
      this.notify();
      throw error;
    } else {
      this.user = data;
      this.notify();
    }
  };

  logout = async (): Promise<void> => {
    await fetchClient.POST("/api/v1/logout");
    this.user = undefined;
    this.notify();
  };

  isAuthenticated = (): boolean => !!this.user;

  getUser = (): AuthUser | undefined => this.user;
}

export const authService = new AuthService();
