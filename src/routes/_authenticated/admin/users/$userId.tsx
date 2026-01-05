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
import { ResetUserPasswordDialog } from "@/components/users/reset-user-password-dialog";
import { UserAttributesCard } from "@/components/users/user-attributes-card";
import { UserGroupsCard } from "@/components/users/user-groups-card";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/users/$userId")({
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

  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);

  return (
    <div className="px-4">
      <div className="flex items-center justify-end-safe pb-4">
        <Button
          variant="outline"
          onClick={() => setShowResetPasswordDialog(true)}
        >
          Reset Password
        </Button>
      </div>
      <div className="flex gap-4">
        <UserAttributesCard userId={userId} className="flex-6" />
        <UserGroupsCard userId={userId} className="flex-6" />
      </div>
      <ResetUserPasswordDialog
        userId={userId}
        open={showResetPasswordDialog}
        setOpen={setShowResetPasswordDialog}
      />
    </div>
  );
}
