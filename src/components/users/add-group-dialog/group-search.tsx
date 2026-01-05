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
import { useCreateGroup } from "@/components/groups/hooks";
import type { MinimalGroup } from "@/components/groups/models";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { type FunctionComponent, useState } from "react";

interface GroupSearchProps {
  value: MinimalGroup;
  handleChange: (updater: (prev: MinimalGroup) => MinimalGroup) => void;
}

export const GroupSearch: FunctionComponent<GroupSearchProps> = ({
  value,
  handleChange,
}) => {
  const [search, setSearch] = useState("");
  const { mutate: createGroup } = useCreateGroup();

  const debouncedSearch = useDebouncedValue(search, 300);
  const { data: groups = [], isFetching } = useQuery({
    ...apiClient.queryOptions("get", "/api/v1/auth/groups", {
      params: { query: { filter: debouncedSearch } },
    }),
    enabled: debouncedSearch.length > 0,
  });

  const createNewGroup = () => {
    createGroup({ body: debouncedSearch });
  };

  const toggleGroup = (group: MinimalGroup) => {
    handleChange(() => group);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value ? value.name : "Select group..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search groups…"
          />
          <CommandList>
            {debouncedSearch.length > 0 && (
              <>
                <CommandItem forceMount onSelect={createNewGroup}>
                  Create new group "{debouncedSearch}"
                </CommandItem>
                <CommandSeparator />
              </>
            )}
            {!isFetching &&
              groups.length === 0 &&
              debouncedSearch.length > 0 && (
                <CommandEmpty>No groups found.</CommandEmpty>
              )}
            {groups.length > 0 && (
              <CommandGroup>
                {groups.map((group) => {
                  return (
                    <CommandItem
                      key={group.uniqueId}
                      onSelect={() =>
                        toggleGroup({
                          uniqueId: group.uniqueId,
                          name: group.name,
                        })
                      }
                      className="flex items-center justify-between"
                    >
                      {group.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
