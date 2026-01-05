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

import { CreateGroupDialog } from "@/components/groups/create-group-dialog";
import { GroupTableRowActions } from "@/components/groups/group-table-row-actions";
import type { Group } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserX } from "lucide-react";
import { type FunctionComponent, useState } from "react";

interface GroupTableProps {
  groups?: Group[];
}

const columns: ColumnDef<Group>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={ row.getIsSelected() }
  //       onCheckedChange={ (value) => row.toggleSelected(!!value) }
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <Button variant="link" asChild className="px-0">
        <Link
          to="/admin/groups/$groupId"
          params={{ groupId: row.original.uniqueId }}
        >
          {row.original.name}
        </Link>
      </Button>
    ),
  },
  {
    header: "Users",
    cell: ({ row }) => (row.original.usersList ?? []).length,
  },
  {
    id: "actions",
    cell: ({ row }) => <GroupTableRowActions groupId={row.original.uniqueId} />,
    size: 30,
  },
];

export const GroupTable: FunctionComponent<GroupTableProps> = ({ groups }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [ rowSelection, setRowSelection ] = useState({});

  const table = useReactTable({
    data: groups ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      // rowSelection
    },
  });

  if ((groups ?? []).length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserX />
          </EmptyMedia>
          <EmptyTitle>No Groups Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any groups yet. Get started by creating
            your first group.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateGroupDialog />
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Search by group name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CreateGroupDialog />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.size,
                      }}
                    >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
