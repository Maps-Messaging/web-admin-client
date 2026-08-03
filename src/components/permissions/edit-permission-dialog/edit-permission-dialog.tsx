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

import { PermissionSelect } from "@/components/permissions/add-permission-dialog/permission-select";
import { useEditNamespacePermission } from "@/components/permissions/hooks";
import type { NamespaceAclItem } from "@/components/permissions/models";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";
import { type FunctionComponent } from "react";
import { toast } from "sonner";
import * as z from "zod";

interface EditPermissionDialogProps {
  namespace: string;
  type: string;
  acl: NamespaceAclItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  effect: z.literal(["ALLOW", "DENY"]),
  permissions: z.array(z.string()).min(1),
});

type EditPermissionFormValues = z.infer<typeof formSchema>;

export const EditPermissionDialog: FunctionComponent<
  EditPermissionDialogProps
> = ({ namespace, type, acl, open, setOpen }) => {
  const { mutate } = useEditNamespacePermission(namespace, type);

  const form = useForm({
    defaultValues: {
      effect: acl.effect,
      permissions: acl.permissions!,
    } satisfies EditPermissionFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutate(
        {
          ...value,
          principalId: acl.principalId,
          principalType: acl.principalType,
        },
        {
          onSuccess: () => {
            toast.success(`Permissions updated for ${namespace}`);
            setOpen(false);
            form.reset();
          },
          onError: (error) =>
            toast.error(`Error updating permissions: ${error}`),
        },
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="edit-permission-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit Permission for {} {namespace ? namespace : "<root>"}
            </DialogTitle>
            <DialogDescription>
              Permission will be inherited by all children
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <div>
              {acl.principalType} - {acl.principalId}
            </div>
            <form.Field
              name="effect"
              children={(field) => {
                return (
                  <FieldSet className="w-full max-w-xs">
                    <FieldLegend variant="label">Effect</FieldLegend>
                    <RadioGroup className="flex" value={field.state.value}>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value="ALLOW"
                          id="ALLOW"
                          onClick={() => field.handleChange("ALLOW")}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="ALLOW">Allow</FieldLabel>
                        </FieldContent>
                      </Field>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value="DENY"
                          id="DENY"
                          onClick={() => field.handleChange("DENY")}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="DENY">Deny</FieldLabel>
                        </FieldContent>
                      </Field>
                    </RadioGroup>
                  </FieldSet>
                );
              }}
            />
            <form.Field
              name="permissions"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="permissions">Permissions</FieldLabel>
                    <FieldDescription>
                      Enter one permission per line
                    </FieldDescription>
                    <PermissionSelect
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
            <DialogClose
              render={<Button variant="outline" onClick={() => form.reset()} />}
            >
              Cancel
            </DialogClose>

            <Button type="submit" form="edit-permission-form">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
