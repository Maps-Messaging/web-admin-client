'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}
const basePath = process.env.BASE_PATH || '';
export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url = color === 'light' ? `${basePath}/assets/logo-emblem.svg` : `${basePath}/assets/logo-emblem--dark.svg`;
  } else {
    url = color === 'light' ? `${basePath}/assets/logo.svg` : `${basePath}/assets/logo--dark.svg`;
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr
      fallback={
        <Box
          sx={{
            height: `${height.toString()}px`,
            width: `${width.toString()}px`
          }}
        />
      }
    >
      <Logo
        color={color}
        height={height}
        width={width}
        {...props}
      />
    </NoSsr>
  );
}
