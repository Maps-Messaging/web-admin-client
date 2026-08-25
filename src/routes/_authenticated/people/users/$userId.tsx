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
import { Button } from "@/components/ui/button";
import { DeleteUserDialog } from "@/components/users/delete-user-dialog";
import { useDeleteUser, useGetUser } from "@/components/users/hooks";
import { ResetUserPasswordDialog } from "@/components/users/reset-user-password-dialog";
import { UserAclCard } from "@/components/users/user-acl-card";
import { UserAttributesCard } from "@/components/users/user-attributes-card";
import { UserGroupsCard } from "@/components/users/user-groups-card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/people/users/$userId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.fetchQuery(
      apiClient.queryOptions("get", "/api/v1/auth/users/{userUuid}", {
        params: { path: { userUuid: params.userId } },
      }),
    );
    return { breadcrumb: data.username };
  },
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { data: user } = useGetUser(userId);
  const navigate = useNavigate();

  const { mutate: deleteUser } = useDeleteUser();

  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    deleteUser(
      { params: { path: { userUuid: userId } } },
      {
        onSuccess: () => {
          navigate({ to: ".." });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 w-6xl mx-auto">
      <div className="px-6 flex items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold">{user?.username}</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setShowResetPasswordDialog(true)}
          >
            Reset Password
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete User
          </Button>
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <UserAttributesCard userId={userId} className="flex-6" />
        <UserGroupsCard userId={userId} className="flex-6" />
      </div>
      <div className="w-full">
        <UserAclCard userId={userId} />
      </div>
      <ResetUserPasswordDialog
        userId={userId}
        open={showResetPasswordDialog}
        setOpen={setShowResetPasswordDialog}
      />
      <DeleteUserDialog
        userId={userId}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
}
