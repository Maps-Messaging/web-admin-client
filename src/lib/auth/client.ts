'use client';

import axios from 'axios';
import {login, logout} from "@/generated/server-health/server-health";
import {LoginResponse} from "@/generated/model";

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
    axios.defaults.headers.common['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;

    try {
      // Call the login function
      const response = await login();

      // Check if the response is a JSON object with the expected properties
      if (response.status === 200 && response.data?.status) {
        const token = generateToken();
        localStorage.setItem('custom-auth-token', token);
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
    axios.defaults.headers.common['Authorization'] = '';
    return {};
  }
}

export const authClient = new AuthClient();
