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

import React, {useState} from 'react';
import {useGetDestinationDetails} from "@/generated/destination-management/destination-management";
import DestinationDetailHeader from "@/components/destination/destination-details-header";
import SubscriptionStateTable from "@/components/connections/connection/subscription-state-table";
import {Tab, Tabs} from "@mui/material";
import MessageStreamViewer from "@/components/messaging/message-stream-viewer";

interface DestinationDetailProps {
  destinationName: string;
  displayName?: boolean;
}

const tabs = [
  {
    label: 'Details',
    value: 'details'
  },
  {
    label: 'Messages',
    value: 'messages'
  }

]

export function DestinationDetail({ destinationName, displayName=true }: DestinationDetailProps): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('details');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };

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
      {currentTab === 'details' &&
        <div>
            <DestinationDetailHeader
            destinationData={data?.data.destination }
            displayName={displayName}
          />
          <SubscriptionStateTable
            subscriptionStates={data?.data.subscriptionList || []}
            displayName={false}
          />
        </div>
      }
      {currentTab === 'messages' && <MessageStreamViewer
        destination={destinationName || "" } />
      }
    </div>
  );
}

export default DestinationDetail;
