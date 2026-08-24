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
import type { MinimalGroup } from "@/components/groups/models";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { type FunctionComponent, useState } from "react";

interface GroupSearchProps {
  value: MinimalGroup[];
  handleChange: (value: MinimalGroup[]) => void;
}

export const GroupSearch: FunctionComponent<GroupSearchProps> = ({
  value,
  handleChange,
}) => {
  const anchor = useComboboxAnchor();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);
  const { data } = useGroups(debouncedSearch);

  return (
    <Combobox
      items={data}
      multiple
      autoHighlight
      itemToStringLabel={(item) => item.name}
      value={value}
      onValueChange={handleChange}
      onInputValueChange={(nextSearchValue) => {
        setSearch(nextSearchValue);
      }}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: MinimalGroup[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value.uniqueId}>{value.name}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent
        anchor={anchor}
        align="start"
        className="w-full max-w-md"
      >
        <ComboboxEmpty>No groups found.</ComboboxEmpty>
        <ComboboxList>
          {(item: MinimalGroup) => (
            <ComboboxItem key={item.uniqueId} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
