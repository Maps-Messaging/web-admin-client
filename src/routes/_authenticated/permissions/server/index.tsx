/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { apiClient } from "@/api/api-client";
import { AddPermissionDialog } from "@/components/permissions/add-permission-dialog/add-permission-dialog";
import { useResourcePermissions } from "@/components/permissions/hooks";
import { NamespaceAclTable } from "@/components/permissions/namespace-acl-table";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

const SERVER_RESOURCE_TYPE = "Server";

export const Route = createFileRoute("/_authenticated/permissions/server/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError } = apiClient.useQuery(
    "get",
    "/api/v1/name",
  );

  if (isLoading) {
    return <div className="px-6">Loading server permissions...</div>;
  }

  if (isError || !data?.name) {
    return <div className="px-6">Unable to load the server identity.</div>;
  }

  return (
    <div className="px-6 flex flex-col gap-4 w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold">Server Permissions</h1>
      <ServerPermissionsCard serverName={data.name} />
    </div>
  );
}

function ServerPermissionsCard({ serverName }: { serverName: string }) {
  const { data, isLoading, isError } = useResourcePermissions(
    serverName,
    SERVER_RESOURCE_TYPE,
  );
  const displayName = `server ${serverName}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{serverName}</CardTitle>
        <CardAction>
          <AddPermissionDialog
            namespace={serverName}
            type={SERVER_RESOURCE_TYPE}
            displayName={displayName}
            inheritsToChildren={false}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading permissions...</div>
        ) : isError ? (
          <div>Unable to load permissions for this server.</div>
        ) : (
          <NamespaceAclTable
            namespace={serverName}
            type={SERVER_RESOURCE_TYPE}
            acls={data?.entries ?? []}
            displayName={displayName}
            inheritsToChildren={false}
            isEditable
          />
        )}
      </CardContent>
    </Card>
  );
}
