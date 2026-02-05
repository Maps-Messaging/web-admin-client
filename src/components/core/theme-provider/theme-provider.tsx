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
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Experimental_CssVarsProvider as CssVarsProvider, useColorScheme} from '@mui/material/styles';

import {createTheme} from '@/styles/theme/create-theme';

import EmotionCache from './emotion-cache';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<{
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}>({
  mode: 'light',
  toggleColorMode: () => {
    // no-op default to prevent eslint error
  },
});
function ThemeColorToggler({ children }: { children: React.ReactNode }) {
  const { mode = 'light', setMode } = useColorScheme();


  const toggleColorMode = React.useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorMode', newMode);
    }
  }, [mode, setMode]);

  const themeContextValue = React.useMemo(() => ({
    mode: (mode ?? 'light') as 'light' | 'dark',
    toggleColorMode,
  }), [mode, toggleColorMode]);

  return (
    <ThemeContext.Provider
      value={themeContextValue}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme();

  // Get stored preference for initial theme
  const storedMode = typeof window !== 'undefined' ?
    localStorage.getItem('colorMode') as 'light' | 'dark' | null : null;
  const defaultMode = storedMode || 'light';

  return (
    <EmotionCache options={{ key: 'mui' }}>
      <CssVarsProvider
        theme={theme}
        defaultMode={defaultMode}
      >
        <CssBaseline />
        <ThemeColorToggler>
          {children}
        </ThemeColorToggler>
      </CssVarsProvider>
    </EmotionCache>
  );
}
