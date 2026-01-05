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

import { GroupUsersTable } from "@/components/groups/group-users-table";
import { useDeleteGroup, useGroup } from "@/components/groups/hooks";
import type { Group } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type FunctionComponent } from "react";

interface GroupDetailsCardProps {
  groupId: Group["uniqueId"];
}

export const GroupDetailsCard: FunctionComponent<GroupDetailsCardProps> = ({
  groupId,
}) => {
  const { data: group } = useGroup(groupId);
  const { mutate: deleteGroup } = useDeleteGroup();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{group?.name}</CardTitle>
        <CardAction>
          <Button
            variant="destructive"
            onClick={() =>
              deleteGroup({ params: { path: { groupUuid: groupId } } })
            }
          >
            Delete Group
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <GroupUsersTable groupId={groupId} users={group?.usersList ?? []} />
      </CardContent>
    </Card>
  );
};
