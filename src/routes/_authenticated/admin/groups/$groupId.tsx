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

import { apiClient } from "@/api/api-client";
import { queryClient } from "@/api/query-client";
import { GroupDetailsCard } from "@/components/groups/group-details-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/groups/$groupId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.fetchQuery(
      apiClient.queryOptions("get", "/api/v1/auth/groups/{groupUuid}", {
        params: { path: { groupUuid: params.groupId } },
      }),
    );
    return { breadcrumb: data.name };
  },
});

function RouteComponent() {
  const { groupId } = Route.useParams();

  return (
    <div className="px-4 flex justify-center">
      <GroupDetailsCard groupId={groupId} />
    </div>
  );
}
