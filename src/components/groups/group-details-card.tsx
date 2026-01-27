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

import { AddUserDialog } from "@/components/groups/add-user-dialog/add-user-dialog";
import { useAddUserToGroup, useGroup, useRemoveUserFromGroup } from "@/components/groups/hooks";
import type { GroupId } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import type { UserId } from "@/components/users/models";
import { Unlink } from "lucide-react";
import { type FunctionComponent } from "react";
import { toast } from "sonner";

interface GroupDetailsCardProps {
  groupId: GroupId;
  className?: string;
}

export const GroupDetailsCard: FunctionComponent<GroupDetailsCardProps> = ({
  groupId,
  className,
}) => {
  const { data: group } = useGroup(groupId);

  const { mutate: addUserToGroup } = useAddUserToGroup();
  const { mutate: removeUserFromGroup } = useRemoveUserFromGroup();

  const unlinkGroup = (userId: UserId, username: string) => {
    removeUserFromGroup(
      {
        params: {
          path: {
            userUuid: userId,
            groupUuid: groupId,
          },
        },
      },
      {
        onSuccess: () => {
          toast(`User removed`, {
            description: `User "${username}" has been removed from ${group?.name}`,
            action: {
              label: "Undo",
              onClick: () => {
                addUserToGroup({
                  params: { path: { groupUuid: groupId, userUuid: userId } },
                });
              },
            },
          });
        },
      },
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Members</CardTitle>
        <CardAction>
          <AddUserDialog groupId={groupId} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {(group?.usersList ?? []).map(({ username, uniqueId }) => (
          <div className="flex justify-between" key={uniqueId}>
            <LinkButton
              to="/people/users/$userId"
              params={{ userId: uniqueId }}
            >
              {username}
            </LinkButton>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => unlinkGroup(uniqueId, username)}
            >
              <span className="sr-only">Group member</span>
              <Unlink />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
