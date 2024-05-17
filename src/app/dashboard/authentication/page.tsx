'use client'

import * as React from 'react';
import {useState} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersDetails from "@/components/users/users-details";
import GroupDetails from "@/components/users/group-details";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";

const queryClient = new QueryClient();


const tabs = [
  {
    label: 'Users',
    value: 'users'
  },
  {
    label: 'Groups',
    value: 'groups'
  }
]

export default function Page(): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('users');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{px: 3}}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{mt: 3}}>
        {currentTab === 'users' && <UsersDetails/>}
        {currentTab === 'groups' && <GroupDetails />}
      </Box>
    </QueryClientProvider>
  );
}

