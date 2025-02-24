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
import {Tab, Tabs} from "@mui/material";
import MessageStreamViewer from "@/components/messaging/message-stream-viewer";

interface FolderDetailProps {
  folderName: string;
  summary: {
    delayedMessages: number;
    pendingMessages: number;
    storedMessages: number;
    destinationCount: number;
    folderCount: number;
  } | null;
  resetTrigger?: string;
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

export function FolderDetail({ folderName, summary, resetTrigger }: FolderDetailProps): React.JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>('details');

  const handleTabsChange = (event: React.SyntheticEvent, value: string): void => {
    setCurrentTab(value);
  };
  React.useEffect(() => {
    // Handle any reset logic here if needed
    setCurrentTab("details")
  }, [resetTrigger]);

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
          <h3>{folderName}</h3>
          {summary && (
            <div>
              <p>Delayed Messages: {summary.delayedMessages}</p>
              <p>Pending Messages: {summary.pendingMessages}</p>
              <p>Stored Messages: {summary.storedMessages}</p>
              <p>Destinations: {summary.destinationCount}</p>
              <p>Folders: {summary.folderCount}</p>
            </div>
          )}
        </div>
      }
      {currentTab === 'messages' && <MessageStreamViewer
        destination={folderName+'/#' || "" } />
      }
    </div>
  );
}

export default FolderDetail;
