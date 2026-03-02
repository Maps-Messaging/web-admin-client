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
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { useDestinationDetail } from "@/components/namespaces/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import type { FunctionComponent } from "react";

interface NamespaceDetailsCardProps {
  path?: string;
  className?: string;
}

export const NamespaceDetailsCard: FunctionComponent<
  NamespaceDetailsCardProps
> = ({ path, className }) => {
  const { data } = useDestinationDetail(path ?? "", { enabled: !!path });
  const {
    name,
    type,
    schemaId,
    readTimeAveNs,
    writeTimeAveNs,
    deleteTimeAveNs,
    storedMessages,
    delayedMessages,
    pendingMessages,
    noInterestMessages,
    publishedMessages,
    retrievedMessages,
    expiredMessages,
    deliveredMessages,
  } = data?.destination ?? {};
  if (!data) {
    return null;
  }
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">
          <h2>Details</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="flex items-center justify-between">
          <strong>Name:</strong> {name}
        </p>
        <p className="flex items-center justify-between">
          <strong>Type:</strong> {type}
        </p>
        <div className="flex items-center justify-between">
          <strong>Schema:</strong>
          {schemaId ? (
            <LinkButton to="/schemas/$schemaId" params={{ schemaId }}>
              {schemaId}
            </LinkButton>
          ) : null}
        </div>
        <Separator />
        <div>
          <h3>Average Timings (ns)</h3>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center">
              <strong>Read</strong>
              {readTimeAveNs}
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <strong>Write</strong>
              {writeTimeAveNs}
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center">
              <strong>Delete</strong>
              {deleteTimeAveNs}
            </div>
          </div>
        </div>
        <Separator />
        <h3>Message Counts</h3>
        <p className="flex items-center justify-between">
          <strong>Stored:</strong> {storedMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Delayed:</strong>
          {delayedMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Pending:</strong>
          {pendingMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>No Interest:</strong>
          {noInterestMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Published:</strong>
          {publishedMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Retrieved:</strong>
          {retrievedMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Expired:</strong>
          {expiredMessages}
        </p>
        <p className="flex items-center justify-between">
          <strong>Delivered:</strong>
          {deliveredMessages}
        </p>
      </CardContent>
    </Card>
  );
};
