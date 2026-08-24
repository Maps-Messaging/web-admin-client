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

import { useGroups } from "@/components/groups/hooks";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useUsers } from "@/components/users/hooks";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { type FunctionComponent, useState } from "react";

interface SearchValue {
  uniqueId: string;
  name: string;
}

interface SearchProps {
  mode: "IDENTITY" | "GROUP";
  value: SearchValue;
  handleChange: (value?: SearchValue) => void;
}

const text = {
  IDENTITY: {
    placeholder: "Search by username...",
    notFound: "No users found",
    empty: "Start typing to search users...",
    noResults: "No matches found.",
    error: "Failed to search users",
  },
  GROUP: {
    placeholder: "Search by group name...",
    notFound: "No groups found",
    empty: "Start typing to search groups...",
    noResults: "No matches found.",
    error: "Failed to search groups",
  },
} as const;

export const Search: FunctionComponent<SearchProps> = ({
  mode,
  value,
  handleChange,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebouncedValue(searchValue, 300);

  const {
    data: users,
    isPending: fetchingUsers,
    isError: userError,
  } = useUsers(debouncedSearch, {
    enabled: mode === "IDENTITY",
  });

  const {
    data: groups = [],
    isPending: fetchingGroups,
    isError: groupError,
  } = useGroups(debouncedSearch, {
    enabled: mode === "GROUP",
  });

  const isPending = mode === "IDENTITY" ? fetchingUsers : fetchingGroups;
  const isError = mode === "IDENTITY" ? userError : groupError;

  const items = value
    ? [value, ...(mode === "IDENTITY" ? users : groups)]
        .filter((item) => item.uniqueId !== value.uniqueId)
        .map((option) =>
          "username" in option
            ? {
                uniqueId: option.uniqueId,
                name: option.username,
              }
            : {
                uniqueId: option.uniqueId,
                name: option.name,
              },
        )
    : (mode === "IDENTITY" ? users : groups).map((option) =>
        "username" in option
          ? {
              uniqueId: option.uniqueId,
              name: option.username,
            }
          : {
              uniqueId: option.uniqueId,
              name: option.name,
            },
      );

  const trimmedSearchValue = searchValue.trim();

  function getStatus() {
    if (isPending && trimmedSearchValue !== "") {
      return "Searching...";
    }

    if (isError) {
      return text[mode].error;
    }

    if (trimmedSearchValue === "") {
      return value ? null : text[mode].empty;
    }

    if (items.length === 0) {
      return text[mode].noResults;
    }

    return null;
  }

  const status = getStatus();

  return (
    <Combobox
      items={items}
      itemToStringLabel={(item: SearchValue) => item.name}
      value={value}
      onValueChange={(nextSelectedValue) => {
        handleChange(nextSelectedValue ?? undefined);
        setSearchValue("");
      }}
      onInputValueChange={(nextSearchValue) => {
        setSearchValue(nextSearchValue);
      }}
    >
      <ComboboxInput
        placeholder={text[mode].placeholder}
        showClear={!!value.uniqueId}
      />
      <ComboboxContent align="start" className="w-full max-w-md">
        {status && (
          <div className="p-3 text-sm text-muted-foreground">{status}</div>
        )}
        <ComboboxList>
          {items.map((item) => (
            <ComboboxItem key={item.uniqueId} value={item}>
              {item.name}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
