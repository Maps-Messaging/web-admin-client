'use client';

import * as React from 'react';

import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import {LoginResponse} from "@/generated/model";

export interface UserContextValue {
  user: LoginResponse | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: LoginResponse | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data } = await authClient.getUser();
      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      if (err instanceof Error) { // Type check to safely access error properties
        logger.error(err.message);
      } else {
        // Log a generic error or handle non-Error objects differently
        logger.error('An unexpected error occurred');
      }
      // No operation needed here, but you've safely handled the error
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);


  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
