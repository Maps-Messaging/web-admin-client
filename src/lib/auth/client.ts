/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

'use client';

import axios from 'axios';
import {login, logout} from "@/generated/server-health/server-health";
import {LoginResponse} from "@/generated/model";
import axiosInstance from "@/axiosInstance";

axios.defaults.baseURL = process.env.API_BASE_URL;

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

class AuthClient {

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    // Set the browser's basic auth headers
    axiosInstance.defaults.headers.common['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      // Call the login function
      const response = await login();

      // Check if the response is a JSON object with the expected properties
      if (response.status === 200 && response.data?.status) {
        const token = generateToken();
        localStorage.setItem('custom-auth-token', token);
        localStorage.setItem('username', response.data.username || 'anonymous');
        localStorage.setItem('user', JSON.stringify(response.data));
        return {};
      } else {
        return { error: 'Invalid credentials' };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return { error: 'Invalid credentials' };
      }
      return { error: 'An error occurred during login' };
    }
  }

  async getUser(): Promise<{ data?: LoginResponse | null}> {
    const user = localStorage.getItem('user');
    let parsedUser: LoginResponse | null = null;
    if (user) {
      try {
        parsedUser = JSON.parse(user) as LoginResponse;
      } catch {
        return { };
      }
    }
    return { data: parsedUser };
  }

  async signOut(): Promise<{ error?: string }> {
    await logout();
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('user');
    axiosInstance.defaults.headers.common['Authorization'] = '';
    return {};
  }
}

export const authClient = new AuthClient();
