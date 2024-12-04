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

'use client'

import React, {useEffect, useState} from 'react';
import {useGetBuildInfo, useGetStats} from "@/generated/server-management/server-management";
import Container from "@mui/material/Container";
import {Grid, Tab, Tabs} from "@mui/material";
import DataGraph from "@/components/graphs/data-graph";
import DualNumberGraph from "@/components/graphs/dual-number-graph";
import {ServerTopLevelStatus} from "@/components/server/server-top-level-status";
import SubSystemStatusTable from "@/components/server/sub-system-status-table";
import ConnectionDetails from "@/components/connections/connection-details";
import {NameSpaceTable} from "@/components/destination/namespace-table";


const tabs = [
  {
    label: 'Sub System Status',
    value: 'overview'
  },
  {
    label: 'Connections',
    value: 'connections'
  },
  {
    label: 'Destinations',
    value: 'destinations'
  },
  {
    label: 'Analytics',
    value: 'graphs'
  },
]

export function ServerDetails () :  React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };


  const { data: statsData, error: statsError, isLoading: statsLoading } = useGetStats({
    query: {
      refetchInterval: 5000,
    },
  });

  // Fetch build info
  const { data: buildInfoData, error: buildInfoError, isLoading: buildInfoLoading } = useGetBuildInfo({
    query: {
      refetchInterval: 5000,
    },
  });

  const [cpuTime, setCpuTime] = useState<number[]>([]);
  const [freeMemoryData, setFreeMemoryData] = useState<number[]>([]);
  const [noInterest, setNoInterest] = useState<number[]>([]);
  const [published, setPublished] = useState<number[]>([]);
  const [delivered, setDelivered] = useState<number[]>([]);
  const [retrieved, setRetrieved] = useState<number[]>([]);

  // Update arrays whenever new data is fetched
  useEffect(() :void => {
    if (statsData) {
      const updateArray = (prev: number[], newValue: number | undefined) => {
        if (typeof newValue !== 'number') return prev;  // skip update if newValue is undefined or invalid
        const newArray = [...prev, newValue];
        return newArray.length > 120 ? newArray.slice(newArray.length - 120) : newArray;
      };
      setNoInterest(prev => updateArray(prev, statsData.data.data?.noInterestPerSecond || 0));
      setPublished(prev => updateArray(prev, statsData.data.data?.publishedPerSecond || 0));
      setDelivered(prev => updateArray(prev,statsData.data.data?.deliveredPerSecond || 0))
      setRetrieved(prev => updateArray(prev,statsData.data.data?.retrievedPerSecond || 0))
    }
  }, [statsData]);

  useEffect(() :void => {
    if (buildInfoData) {
      const updateArray = (prev: number[], newValue: number | undefined) => {
        if (typeof newValue !== 'number') return prev;  // skip update if newValue is undefined or invalid
        const newArray = [...prev, newValue];
        return newArray.length > 120 ? newArray.slice(newArray.length - 120) : newArray;
      };
      setCpuTime(prev => updateArray(prev, buildInfoData.data.cpuPercent));
      setFreeMemoryData(prev => updateArray(prev, buildInfoData.data.freeMemory));
    }
  }, [buildInfoData]);


  // Display loading state if either query is loading
  if (statsLoading || buildInfoLoading) return <div>Loading data...</div>;

  // Display error if either query fails
  if (statsError || buildInfoError) {
    const errorMessage = statsError?.message || buildInfoError?.message;
    return <div>Error loading data: {errorMessage}</div>;
  }
  return (
    <Container maxWidth="lg">
      <ServerTopLevelStatus />
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
      {currentTab === 'overview' && <SubSystemStatusTable />}
      {currentTab === 'connections' && <ConnectionDetails />}
      {currentTab === 'destinations' && <NameSpaceTable />}
      {currentTab === 'graphs' &&
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DualNumberGraph name1='Published' data1={published} name2='No Interest' data2={noInterest} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DualNumberGraph name1='From Store' data1={retrieved} name2='Delivered' data2={delivered} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Free Memory' data={freeMemoryData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DataGraph name='Cpu Time' data={cpuTime} />
        </Grid>
      </Grid>
      }
    </Container>
  );
}

