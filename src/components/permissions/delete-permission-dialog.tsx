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

import { useDeleteNamespacePermission } from "@/components/permissions/hooks";
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

interface DeleteGroupDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  namespace: string;
  type: string;
  acl: NamespaceAclItem;
  displayName?: string;
}

export const DeletePermissionDialog = ({
  open,
  setOpen,
  namespace,
  type,
  acl,
  displayName = namespace ? namespace : "<root>",
}: DeleteGroupDialogProps) => {
  const { mutate } = useDeleteNamespacePermission(namespace, type);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Delete the permissions for {acl.principalId} on {displayName}? This
            can not be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-between">
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => mutate(acl, { onSuccess: () => setOpen(false) })}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
