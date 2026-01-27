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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { AddGroupDialog } from "@/components/users/add-group-dialog/add-group-dialog";
import { CreateUserDialog } from "@/components/users/create-user-dialog";
import { useDeleteUser } from "@/components/users/hooks";
import type { UserWithLock } from "@/components/users/models";
import { UserTableRowActions } from "@/components/users/user-table-row-actions";
import { Link } from "@tanstack/react-router";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Lock, UserX } from "lucide-react";
import { type FunctionComponent, useState } from "react";

interface UserTableProps {
  users: UserWithLock[];
}

const columns: ColumnDef<UserWithLock>[] = [
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
          to="/people/users/$userId"
          params={{ userId: row.original.uniqueId }}
        >
          {row.original.username}
        </Link>
      </Button>
    ),
  },
  {
    header: "Groups",
    cell: ({ row }) =>
      (row.original.groupList ?? []).map((group) => group?.name).join(", "),
  },
  {
    accessorKey: "locked",
    header: "Locked",
    cell: ({ row }) =>
      row.original.locked ? <Lock className="size-4" /> : null,
  },
  {
    id: "actions",
    cell: ({ row }) => <UserTableRowActions userId={row.original.uniqueId} />,
  },
];

export const UserTable: FunctionComponent<UserTableProps> = ({ users }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { mutate: deleteUser } = useDeleteUser();

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

  const deleteUsers = () => {
    table
      .getFilteredSelectedRowModel()
      .rows.forEach((row) =>
        deleteUser({ params: { path: { userUuid: row.original.uniqueId } } }),
      );
    table.setRowSelection({});
  };

  if ((users ?? []).length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserX />
          </EmptyMedia>
          <EmptyTitle>No Users Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any users yet. Get started by creating your
            first user.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateUserDialog />
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div className="w-full">
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
            <AddGroupDialog
              users={table.getSelectedRowModel().rows.map((row) => ({
                uniqueId: row.original.uniqueId,
                username: row.original.username,
              }))}
            />
            <Button variant="destructive" onClick={deleteUsers}>
              Delete Users
            </Button>
          </div>
        ) : (
          <CreateUserDialog />
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
