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

import { DeleteSchemaDialog } from "@/components/schemas/delete-schema-dialog";
import { useDeleteSchema } from "@/components/schemas/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { type FunctionComponent, useState } from "react";
import type { Schema } from "./models";

interface SchemaTableRowActionsProps {
  schemaId: Schema["uniqueId"];
}

export const SchemaTableRowActions: FunctionComponent<
  SchemaTableRowActionsProps
> = ({ schemaId }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteSchema } = useDeleteSchema();

  const handleDelete = () => {
    deleteSchema(
      { params: { path: { schemaId } } },
      {
        onSuccess: () => {
          setShowDeleteDialog(false);
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              to="/schemas/$schemaId"
              params={{
                schemaId,
              }}
            >
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Delete Schema
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSchemaDialog
        schemaId={schemaId}
        onConfirm={handleDelete}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
      />
    </>
  );
};
