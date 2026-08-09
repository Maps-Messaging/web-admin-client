/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useDestinationDetail } from "@/components/namespaces/hooks";
import { AddPermissionDialog } from "@/components/permissions/add-permission-dialog/add-permission-dialog";
import { useNamespacePermissions } from "@/components/permissions/hooks";
import { NamespaceAclTable } from "@/components/permissions/namespace-acl-table";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNamespaceHierarchy } from "@/lib/namespace";
import type { FunctionComponent } from "react";

interface NamespaceDetailsCardProps {
  namespace: string;
  className?: string;
}

export const NamespaceDetailCard: FunctionComponent<
  NamespaceDetailsCardProps
> = ({ namespace, className }) => {
  const { data } = useDestinationDetail(namespace);
  const type = data?.destination?.type ?? "";
  const { explicitPermissions, inheritedPermissions } = useNamespacePermissions(
    namespace,
    type,
  );

  const namespaceHierarchy = getNamespaceHierarchy(namespace);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{namespace ? namespace : "<root>"}</CardTitle>
        <CardAction>
          <AddPermissionDialog namespace={namespace} type={type} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <NamespaceAclTable
          namespace={namespace}
          type={type}
          acls={explicitPermissions}
          isEditable
        />
        {namespaceHierarchy.length > 1 ? (
          <>
            Inherited Permissions
            <NamespaceAclTable
              namespace={namespace}
              type={type}
              acls={inheritedPermissions}
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
