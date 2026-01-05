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

import { useAddUserToGroup } from "@/components/groups/hooks";
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
import { GroupSearch } from "@/components/users/add-group-dialog/group-search";
import { useForm } from "@tanstack/react-form";
import { type FunctionComponent, useState } from "react";
import * as z from "zod";
import type { MinimalUser } from "../models";

const formSchema = z.object({
  group: z.object({
    uniqueId: z.string(),
    name: z.string(),
  }),
});

interface AddGroupDialogProps {
  users: MinimalUser[];
}

export const AddGroupDialog: FunctionComponent<AddGroupDialogProps> = ({
  users,
}) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useAddUserToGroup();

  const form = useForm({
    defaultValues: {
      group: {
        uniqueId: "",
        name: "",
      },
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const results = await Promise.allSettled(
        users.map(({ uniqueId }) =>
          mutate({
            params: {
              path: { groupUuid: value.group.uniqueId, userUuid: uniqueId },
            },
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
          <Button>Add to Group</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Users to Group</DialogTitle>
            <DialogDescription>
              Select the group to which you want to add the selected users or
              create a new group.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="group"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <GroupSearch
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
