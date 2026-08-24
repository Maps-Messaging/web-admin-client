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
import { DeleteGroupDialog } from "@/components/groups/delete-group-dialog";
import { GroupAclCard } from "@/components/groups/group-acl-card";
import { GroupDetailsCard } from "@/components/groups/group-details-card";
import { useDeleteGroup, useGroup } from "@/components/groups/hooks";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/people/groups/$groupId")({
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const { data: group } = useGroup(groupId);
  const { mutate: deleteGroup } = useDeleteGroup();

  const handleDelete = () => {
    deleteGroup(
      { params: { path: { groupUuid: groupId } } },
      {
        onSuccess: () => {
          navigate({ to: ".." });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 w-6xl mx-auto">
      <div className="px-6 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">{group?.name}</h1>
        <div>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete Group
          </Button>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <GroupDetailsCard groupId={groupId} className="flex-6" />
        <GroupAclCard groupId={groupId} className="flex-6" />
      </div>
      <DeleteGroupDialog
        groupId={groupId}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
}
