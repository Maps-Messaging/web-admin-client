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

import {
  type InheritedPermissions,
  isInheritedPermission,
  type NamespaceAclItem,
} from "@/components/permissions/models";
import { NamespaceAclTableRowActions } from "@/components/permissions/namespace-acl-table-row-actions";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";
import { LockKeyholeOpen } from "lucide-react";
import type { FunctionComponent } from "react";
import { useMemo } from "react";

interface NamespaceAclTableProps {
  acls: NamespaceAclItem[] | InheritedPermissions[];
  isEditable?: boolean;
  namespace: string;
  type: string;
  displayName?: string;
  inheritsToChildren?: boolean;
}

export const NamespaceAclTable: FunctionComponent<NamespaceAclTableProps> = ({
  acls,
  isEditable = false,
  namespace,
  type,
  displayName,
  inheritsToChildren = true,
}) => {
  const columns = useMemo<ColumnDef<NamespaceAclItem | InheritedPermissions>[]>(
    () => [
      ...(acls.some((acl) => isInheritedPermission(acl))
        ? [
            {
              id: "source",
              header: "Source",
              cell: ({ row }) => (row.original as InheritedPermissions).source,
            } as ColumnDef<NamespaceAclItem | InheritedPermissions>,
          ]
        : []),
      {
        id: "principal",
        header: "Principal",
        cell: ({ row }) => row.original.principalId,
      },
      {
        id: "principalType",
        header: "Principal Type",
        cell: ({ row }) => row.original.principalType,
      },
      {
        id: "effect",
        header: "Effect",
        cell: ({ row }) => row.original.effect,
      },
      {
        id: "permissions",
        header: "Permissions",
        cell: ({ row }) => (row.original?.permissions ?? []).join(", "),
      },

      ...(isEditable
        ? [
            {
              id: "actions",
              cell: ({ row }: { row: Row<NamespaceAclItem> }) => (
                <NamespaceAclTableRowActions
                  namespace={namespace}
                  type={type}
                  acl={row.original}
                  displayName={displayName}
                  inheritsToChildren={inheritsToChildren}
                />
              ),
              size: 30,
            },
          ]
        : []),
    ],
    [acls, displayName, inheritsToChildren, isEditable, namespace, type],
  );

  const table = useReactTable({
    data: acls,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if ((acls ?? []).length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LockKeyholeOpen />
          </EmptyMedia>
          <EmptyTitle>No Permissions Yet</EmptyTitle>
          <EmptyDescription>
            {inheritsToChildren
              ? "There are no permissions directly set on this namespace. Access is inherited from its parents."
              : "There are no permissions directly set on this server."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
