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

import * as React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import '../../../../hostname-lookup'
import {useSearchParams} from "next/navigation";
import GroupDetails from "@/components/users/group/group-detail";

const queryClient = new QueryClient();

export default function Page(): React.JSX.Element {
  const searchParams = useSearchParams()
  const name = searchParams.get('groupname')

  return (
    <QueryClientProvider client={queryClient}>
      <GroupDetails group={name||''} />
    </QueryClientProvider>
  );
}

