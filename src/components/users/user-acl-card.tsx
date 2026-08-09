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

import { EntityAclTable } from "@/components/acl/entity-acl-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserAcls } from "@/components/users/hooks";
import type { UserId } from "@/components/users/models";
import type { FunctionComponent } from "react";

interface UserAclCardProps {
  userId: UserId;
  className?: string;
}

export const UserAclCard: FunctionComponent<UserAclCardProps> = ({
  userId,
  className,
}) => {
  const { data } = useUserAcls(userId);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Permissions</CardTitle>
        <CardDescription>
          Specific permissions assigned to this user.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <EntityAclTable entityAcls={data?.entries ?? []} />
      </CardContent>
    </Card>
  );
};
