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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteUser, useUnlockUser } from "@/components/users/hooks";
import type { UserId } from "@/components/users/models";
import { ResetUserPasswordDialog } from "@/components/users/reset-user-password-dialog";
import { Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { type FunctionComponent, useState } from "react";

interface UserTableRowActionsProps {
  userId: UserId;
}

export const UserTableRowActions: FunctionComponent<
  UserTableRowActionsProps
> = ({ userId }) => {
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: unlockUser } = useUnlockUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              to="/admin/users/$userId"
              params={{
                userId,
              }}
            >
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowResetPasswordDialog(true)}>
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                unlockUser({ params: { path: { userUuid: userId } } })
              }
            >
              Unlock User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                deleteUser({ params: { path: { userUuid: userId } } })
              }
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResetUserPasswordDialog
        userId={userId}
        open={showResetPasswordDialog}
        setOpen={setShowResetPasswordDialog}
      />
    </>
  );
};
