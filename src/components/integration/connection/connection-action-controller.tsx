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

import ActionController from "@/components/general/action-controller";
import toast from "react-hot-toast";
import {handleIntegrationActionRequest, useGetByNameIntegration } from '@/generated/server-integration-management/server-integration-management';


interface ConnectionActionControllerProps {
  name: string;
}

export default function ConnectionActionController({
                                          name=''
                                        }: ConnectionActionControllerProps): React.JSX.Element {

  const { data, error, isLoading } = useGetByNameIntegration(name ||'',{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  const performAction = async (state:string): Promise<void> => {
    if (!name) return;

    try {
      await handleIntegrationActionRequest(name, { state: state });
      toast.success("Interface "+state);
    } catch (error1) {
      toast.error("Interface state unchanged");
    }
  }

  return (
    <ActionController
      currentState={data?.data.state ||''}
      onPause={() => performAction("paused")}
      onStart={() => performAction("started")}
      onStop={() => performAction("stopped")}
      onResume={() => performAction("resumed")}
    />
  );
}

