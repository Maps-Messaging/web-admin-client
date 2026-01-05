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

import { useAddUserToGroup, useGroup } from "@/components/groups/hooks";
import type { GroupId } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { type FunctionComponent, useState } from "react";
import * as z from "zod";
import { SelectedUsers } from "./selected-users";
import { UserSearch } from "./user-search";

const formSchema = z.object({
  users: z
    .array(
      z.object({
        uniqueId: z.string(),
        username: z.string(),
      }),
    )
    .min(1, "Select at least one user"),
});

type AddUsersFormValues = z.infer<typeof formSchema>;

interface AddUserDialogProps {
  groupId: GroupId;
}

export const AddUserDialog: FunctionComponent<AddUserDialogProps> = ({
  groupId,
}) => {
  const [open, setOpen] = useState(false);

  const { data: group } = useGroup(groupId);

  const { mutate } = useAddUserToGroup();

  const form = useForm({
    defaultValues: {
      users: [] as AddUsersFormValues["users"],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const results = await Promise.allSettled(
        value.users.map(({ uniqueId }) =>
          mutate({
            params: { path: { groupUuid: groupId, userUuid: uniqueId } },
          }),
        ),
      );
      if (results.every((r) => r.status === "fulfilled")) {
        setOpen(false);
        form.reset();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="add-users-group-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button>Add users</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Users to {group?.name}</DialogTitle>
            <DialogDescription>
              Search and add users to the group. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="users"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <SelectedUsers
                      value={field.state.value}
                      handleChange={field.handleChange}
                      groupId={groupId}
                    />
                    <UserSearch
                      value={field.state.value}
                      handleChange={field.handleChange}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="add-users-group-form">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
