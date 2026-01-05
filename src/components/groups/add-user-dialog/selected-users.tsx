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
import type { GroupId } from "@/components/groups/models";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MinimalUser } from "@/components/users/models";
import { cn } from "@/lib/utils";
import { useMutationState } from "@tanstack/react-query";
import { X } from "lucide-react";
import type { FunctionComponent } from "react";

interface SelectedUsersProps {
  value: MinimalUser[];
  handleChange: (updater: (prev: MinimalUser[]) => MinimalUser[]) => void;
  groupId: GroupId;
}

const UserBadge = ({
  user,
  removeUser,
  groupId,
}: {
  user: MinimalUser;
  removeUser: (uuid: string) => void;
  groupId: GroupId;
}) => {
  const status = useMutationState<string>({
    filters: {
      mutationKey: apiClient.queryOptions(
        "post",
        "/api/v1/auth/groups/{groupUuid}/{userUuid}",
        {
          params: {
            path: {
              groupUuid: groupId,
              userUuid: user.uniqueId,
            },
          },
        },
      ).queryKey,
    },
    select: (mutation) => mutation.state.status,
  })[0];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1",
        status === "success" && "bg-green-600/20 border-green-600",
        status === "error" && "bg-red-600/20 border-red-600",
      )}
    >
      {user.username}
      {!status && (
        <button
          type="button"
          onClick={() => removeUser(user.uniqueId)}
          className="rounded-sm hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export const SelectedUsers: FunctionComponent<SelectedUsersProps> = ({
  value,
  handleChange,
  groupId,
}) => {
  const removeUser = (uuid: string) => {
    handleChange((prev) => prev.filter((u) => u.uniqueId !== uuid));
  };

  return (
    <ScrollArea className="max-h-32">
      <div className="flex flex-wrap gap-2">
        {value.map((user) => (
          <UserBadge
            key={user.uniqueId}
            user={user}
            removeUser={removeUser}
            groupId={groupId}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
