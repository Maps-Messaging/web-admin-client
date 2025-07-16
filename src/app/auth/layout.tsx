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

import * as React from 'react';
import RouterLink from 'next/link';
import {Paper} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {paths} from '@/paths';
import {DynamicLogo} from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'radial-gradient(#122647, #090E23)',
        minHeight: '100%',
      }}
    >
      <Box>
        <Paper elevation={1} sx={{ background: 'white', p: 3 }}>
          <Stack alignItems="center" spacing={4}>
            <Box component={RouterLink} href={paths.home}>
              <DynamicLogo colorDark="light" colorLight="dark" height={64} width={180} />
            </Box>
            <Box>{children}</Box>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}
