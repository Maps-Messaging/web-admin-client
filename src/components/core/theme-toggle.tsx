'use client';

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import { Moon, Sun } from '@phosphor-icons/react';

export function ThemeToggle(): React.JSX.Element {
  const { mode, setMode } = useColorScheme();
  
  const handleToggleTheme = React.useCallback((): void => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  return (
    <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
      <IconButton onClick={handleToggleTheme} sx={{ color: 'neutral.500' }}>
        {mode === 'light' ? (
          <Moon weight="regular" />
        ) : (
          <Sun weight="regular" />
        )}
      </IconButton>
    </Tooltip>
  );
}