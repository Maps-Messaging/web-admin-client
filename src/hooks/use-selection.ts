/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as React from 'react';

export interface Selection<T = string> {
  deselectAll: () => void;
  deselectOne: (key: T) => void;
  selectAll: () => void;
  selectOne: (key: T) => void;
  selected: Set<T>;
  selectedAny: boolean;
  selectedAll: boolean;
}

// IMPORTANT: To prevent infinite loop, `keys` argument must be memoized with React.useMemo hook.
export function useSelection<T = string>(keys: T[] = []): Selection<T> {
  const [selected, setSelected] = React.useState<Set<T>>(new Set());

  React.useEffect(() => {
    setSelected(new Set());
  }, [keys]);

  const handleDeselectAll = React.useCallback(() => {
    setSelected(new Set());
  }, []);

  const handleDeselectOne = React.useCallback((key: T) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.delete(key);
      return copy;
    });
  }, []);

  const handleSelectAll = React.useCallback(() => {
    setSelected(new Set(keys));
  }, [keys]);

  const handleSelectOne = React.useCallback((key: T) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.add(key);
      return copy;
    });
  }, []);

  const selectedAny = selected.size > 0;
  const selectedAll = selected.size === keys.length;

  return {
    deselectAll: handleDeselectAll,
    deselectOne: handleDeselectOne,
    selectAll: handleSelectAll,
    selectOne: handleSelectOne,
    selected,
    selectedAny,
    selectedAll,
  };
}
