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

import { useRemoveUserFromGroup } from "@/components/groups/hooks";
import type { GroupId } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { AddGroupDialog } from "@/components/users/add-group-dialog/add-group-dialog";
import { useGetUser } from "@/components/users/hooks";
import type { UserId } from "@/components/users/models";
import { Unlink } from "lucide-react";
import type { FunctionComponent } from "react";

interface UserGroupsCardProps {
  userId: UserId;
  className?: string;
}

export const UserGroupsCard: FunctionComponent<UserGroupsCardProps> = ({
  userId,
  className,
}) => {
  const { data: user } = useGetUser(userId);
  const { mutate: removeUserFromGroup } = useRemoveUserFromGroup();

  const unlinkGroup = (groupId: GroupId) => {
    removeUserFromGroup({
      params: {
        path: {
          userUuid: userId,
          groupUuid: groupId,
        },
      },
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Groups</CardTitle>
        <CardDescription>
          This user is a member of the following groups
        </CardDescription>
        <CardAction>
          <AddGroupDialog
            users={
              user ? [{ uniqueId: user.uniqueId, username: user.username }] : []
            }
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {(user?.groupList ?? [])
          .filter((group) => group !== null)
          .map(({ name, uniqueId }) => (
            <div className="flex justify-between" key={uniqueId}>
              <LinkButton
                to="/people/groups/$groupId"
                params={{ groupId: uniqueId }}
              >
                {name}
              </LinkButton>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => unlinkGroup(uniqueId)}
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
