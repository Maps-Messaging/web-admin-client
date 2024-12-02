'use client';

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
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import {useGetDestinationDetails} from "@/generated/destination-management/destination-management";
import DestinationDetailHeader from "@/components/destination/destination-details-header";
import SubscriptionStateTable from "@/components/connections/connection/subscription-state-table";

interface DestinationDetailProps {
  destinationName: string;
}

export function DestinationDetail({ destinationName }: DestinationDetailProps): React.JSX.Element {

  const params = {
    destinationName: destinationName,
  }
  const { data, error, isLoading } = useGetDestinationDetails(params,{
    query:{
      refetchInterval: 60000
    }
  });

  if (isLoading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name: {error.message}</div>;

  return (
    <div>
      <DestinationDetailHeader destinationData={data?.data.destination } />
      <SubscriptionStateTable
        subscriptionStates={data?.data.subscriptionList || []}
        displayName={false}
      />
    </div>
  );
}

export default DestinationDetail;
