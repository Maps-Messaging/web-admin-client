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

import type { EntityAcl } from "@/components/acl/models";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
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
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { FunctionComponent } from "react";

interface EntityAclTableProps {
  entityAcls: EntityAcl[];
}

const columnHelper = createColumnHelper<EntityAcl>();

const columns = [
  columnHelper.accessor("resourceType", {
    id: "type",
    header: "Type",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("resourceKey", {
    id: "name",
    header: "Name",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("effect", {
    id: "effect",
    header: "Effect",
    cell: (props) => props.getValue().toUpperCase(),
  }),
  columnHelper.accessor("permissions", {
    id: "permissions",
    header: "Permissions",
    cell: (props) => props.getValue().join(", "),
  }),
];

export const EntityAclTable: FunctionComponent<EntityAclTableProps> = ({
  entityAcls,
}) => {
  const table = useReactTable({
    data: entityAcls ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!entityAcls || entityAcls.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No Permissions</EmptyTitle>
          <EmptyDescription>
            There are no specific permissions for this entity.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {flexRender(
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
  );
};
