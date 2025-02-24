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

'use client'

import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Box from "@mui/material/Box";
import {useSearchParams} from "next/navigation";
import DestinationDetail from "@/components/destination/destination-details";

const queryClient = new QueryClient();

export default function StatusPage (): React.JSX.Element {

  const searchParams = useSearchParams()
  const destinationName = searchParams.get('destinationName')

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{mt: 3}}>
        <DestinationDetail  destinationName={destinationName || ''} />
      </Box>
    </QueryClientProvider>
  );
}
