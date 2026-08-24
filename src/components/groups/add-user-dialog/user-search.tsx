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

import { apiClient } from "@/api/api-client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MinimalUser } from "@/components/users/models";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { type FunctionComponent, useState } from "react";

interface UserSearchProps {
  value: MinimalUser[];
  handleChange: (updater: (prev: MinimalUser[]) => MinimalUser[]) => void;
}

export const UserSearch: FunctionComponent<UserSearchProps> = ({
  value,
  handleChange,
}) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);
  const { data: users = [], isFetching } = useQuery({
    ...apiClient.queryOptions("get", "/api/v1/auth/users", {
      params: { query: { filter: debouncedSearch } },
    }),
    enabled: debouncedSearch.length > 0,
  });

  const toggleUser = (user: MinimalUser) => {
    handleChange((prev) =>
      prev.some((u) => u.uniqueId === user.uniqueId)
        ? prev.filter((u) => u.uniqueId !== user.uniqueId)
        : [...prev, user],
    );
  };

  return (
    <Command className="rounded-lg border shadow-md" shouldFilter={false}>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Search by username…"
      />

      {isFetching && (
        <div className="p-3 text-sm text-muted-foreground">Searching…</div>
      )}

      {!isFetching && users.length === 0 && debouncedSearch.length > 0 && (
        <CommandEmpty>No users found.</CommandEmpty>
      )}
      {users.length > 0 && (
        <CommandGroup>
          <ScrollArea className="max-h-64">
            {users.map((user) => {
              const isSelected = value.some(
                (u) => u.uniqueId === user.uniqueId,
              );

              return (
                <CommandItem
                  key={user.uniqueId}
                  onSelect={() =>
                    toggleUser({
                      uniqueId: user.uniqueId,
                      username: user.username,
                    })
                  }
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span>{user.username}</span>
                  </div>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              );
            })}
          </ScrollArea>
        </CommandGroup>
      )}
    </Command>
  );
};
