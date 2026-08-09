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
import { useAddNamespacePermission } from "@/components/permissions/hooks";
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
import { type FunctionComponent, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { Search } from "./search";

interface AddPermissionDialogProps {
  namespace: string;
  type: string;
}

const formSchema = z.object({
  principalType: z.literal(["IDENTITY", "GROUP"]),
  principalId: z.object({
    uniqueId: z.string(),
    name: z.string(),
  }),
  effect: z.literal(["ALLOW", "DENY"]),
  permissions: z.array(z.string()).min(1),
});

type AddPermissionFormValues = z.infer<typeof formSchema>;

export const AddPermissionDialog: FunctionComponent<
  AddPermissionDialogProps
> = ({ namespace, type }) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useAddNamespacePermission(namespace, type);

  const form = useForm({
    defaultValues: {
      principalType: "IDENTITY" as AddPermissionFormValues["principalType"],
      principalId: { name: "", uniqueId: "" },
      effect: "ALLOW" as AddPermissionFormValues["effect"],
      permissions: [] as string[],
    } satisfies AddPermissionFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      mutate(
        {
          ...value,
          principalId: value.principalId.uniqueId,
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
        id="add-permission-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger render={<Button />}>Add permission</DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add Permission to {namespace ? namespace : "<root>"}
            </DialogTitle>
            <DialogDescription>
              Permission will be inherited by all children
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FieldSet className="w-full max-w-xs">
              <FieldLegend variant="label">Principal</FieldLegend>
              <FieldDescription>
                The identity (user or group) to which these permissions will be
                applied.
              </FieldDescription>
              <form.Field
                name="principalType"
                listeners={{
                  onChange: () => {
                    form.resetField("principalId");
                  },
                }}
                children={(field) => {
                  return (
                    <RadioGroup className="flex" value={field.state.value}>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value="IDENTITY"
                          id="IDENTITY"
                          onClick={() => field.handleChange("IDENTITY")}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="IDENTITY">Users</FieldLabel>
                        </FieldContent>
                      </Field>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          value="GROUP"
                          id="GROUP"
                          onClick={() => field.handleChange("GROUP")}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="GROUP">Groups</FieldLabel>
                        </FieldContent>
                      </Field>
                    </RadioGroup>
                  );
                }}
              />
              <form.Subscribe
                selector={(state) => state.values.principalType}
                children={(principalType) => (
                  <form.Field
                    name="principalId"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <Search
                            mode={principalType}
                            value={field.state.value ?? undefined}
                            handleChange={(value) =>
                              field.handleChange(
                                value ?? { name: "", uniqueId: "" },
                              )
                            }
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                )}
              />
            </FieldSet>
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

            <Button type="submit" form="add-permission-form">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
