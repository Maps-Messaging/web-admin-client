'use client'

import * as React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {ServerDetails} from "@/components/server/server-details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container spacing={3}>
        <ServerDetails />
      </Grid>
    </QueryClientProvider>

  );
}
