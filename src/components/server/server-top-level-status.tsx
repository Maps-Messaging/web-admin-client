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

'use client'

import React from 'react';

import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {ServerOverviewBox} from "@/components/server/stats/server-overview-box";
import {ServerMemoryUsageBox} from "@/components/server/stats/server-memory-usage-box";
import {ServerThreadUsageBox} from "@/components/server/stats/server-thread-usage-box";
import {ServerStatsBox} from "@/components/server/stats/server-stats-box";
import {useGetBuildInfo} from "@/generated/server-management/server-management";

export function ServerTopLevelStatus () :  React.JSX.Element {

  const { data, error, isLoading } = useGetBuildInfo({
    query:{
      refetchInterval: 5000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          {/* Build Info */}
          <ServerOverviewBox data={data?.data || {} }/>
        </Grid>

        {/* Memory usage */}
        <Grid item xs={12} sm={6} md={3}>
          <ServerMemoryUsageBox data={data?.data || {} }/>
        </Grid>

        {/* Thread info */}
        <Grid item xs={12} sm={6} md={3}>
          <ServerThreadUsageBox data={data?.data || {} }/>
        </Grid>

        {/* Destination info */}
        <Grid item xs={12} sm={6} md={3}>
           <ServerStatsBox info={data?.data || {} }/>
        </Grid>
      </Grid>
    </Container>
  );
}

