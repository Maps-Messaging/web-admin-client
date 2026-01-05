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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetUser } from "@/components/users/hooks";
import type { UserId } from "@/components/users/models";
import type { FunctionComponent } from "react";

interface UserAttributesCardProps {
  userId: UserId;
  className?: string;
}

export const UserAttributesCard: FunctionComponent<UserAttributesCardProps> = ({
  userId,
  className,
}) => {
  const { data: user } = useGetUser(userId);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User attributes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center justify-between">
          <strong>Username:</strong> {user?.username}
        </p>
        <p className="flex items-center justify-between flex-wrap">
          <strong>ID:</strong> {user?.uniqueId}
        </p>
        <Separator className="my-4" />
        {Object.entries(user?.attributes ?? {}).map(([key, value]) => (
          <p key={key} className="flex items-center justify-between">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
