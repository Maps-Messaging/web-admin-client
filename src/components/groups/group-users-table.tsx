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
import { useRemoveUserFromGroup } from "@/components/groups/hooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { type FunctionComponent, useState } from "react";
import type { Group, GroupId } from "./models";

interface GroupUserTableProps {
  users: NonNullable<Group["usersList"]>;
  groupId: GroupId;
}

const columns: ColumnDef<GroupUserTableProps["users"][number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: "username",
    header: "Username",
    cell: ({ row }) => (
      <Button variant="link" asChild className="px-0">
        <Link
          to="/admin/users/$userId"
          params={{ userId: row.original?.uniqueId }}
        >
          {row.original?.username}
        </Link>
      </Button>
    ),
  },
];

export const GroupUsersTable: FunctionComponent<GroupUserTableProps> = ({
  groupId,
  users,
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const { mutate: removeUserFromGroup } = useRemoveUserFromGroup();

  const removeUsers = () => {
    table.getFilteredSelectedRowModel().rows.forEach((row) =>
      removeUserFromGroup({
        params: {
          path: {
            userUuid: row.original.uniqueId,
            groupUuid: groupId,
          },
        },
      }),
    );
    table.setRowSelection({});
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Search by username..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">
              {table.getFilteredSelectedRowModel().rows.length > 1
                ? `${table.getFilteredSelectedRowModel().rows.length} users selected.`
                : "1 user selected."}
            </div>
            <Button variant="destructive" size="sm" onClick={removeUsers}>
              Remove Users
            </Button>
          </div>
        ) : (
          <AddUserDialog groupId={groupId} />
        )}
      </div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  {columnFilters.length > 0
                    ? "No results."
                    : "No users in group"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
