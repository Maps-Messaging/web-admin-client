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
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import {Bell as BellIcon} from '@phosphor-icons/react/dist/ssr/Bell';
import {List as ListIcon} from '@phosphor-icons/react/dist/ssr/List';

import {usePopover} from '@/hooks/use-popover';

import {MobileNav} from './mobile-nav';
import {UserPopover} from './user-popover';
import {useGetName} from "@/generated/server-health/server-health";
import Typography from "@mui/material/Typography";
import {Logo} from "@/components/core/logo";
import {ThemeToggle} from '@/components/core/theme-toggle';
import {useGetServerHealthSummary} from "@/generated/server-management/server-management";

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .join('');
}

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  const username = getInitials(localStorage.getItem('username') || 'anonymous');
  const {data: healthSummaryData} = useGetServerHealthSummary({
    query:{
      refetchInterval: 30000
    }
  });

  const { data } = useGetName({
    query:{}
  });

  function getStatusByNumber(value: number): 'success' | 'warning' {
    return value > 0 ? 'warning' : 'success';
  }

  function getStatusToolTip(value: number): string {
    if(value === 0){
      return 'No issues found'
    }
    return value === 1
      ? `${value.toString()} sub-system has an issue`
      : `${value.toString()} sub-systems have issues`;
  }

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Logo
              color="light"
              emblem={true}
              height={32}
              width={32}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Server : { data?.data.name || 'Loading...'}
            </Typography>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title={getStatusToolTip(healthSummaryData?.data.issueCount || 0)}>
              <Badge
                badgeContent={healthSummaryData?.data.issueCount || 0}
                color={getStatusByNumber(healthSummaryData?.data.issueCount || 0)}
              >
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <ThemeToggle />
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              sx={{ cursor: 'pointer' }}
            >
              {username}
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
