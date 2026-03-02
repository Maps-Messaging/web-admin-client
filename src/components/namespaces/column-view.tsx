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

import { useDestinationList } from "@/components/namespaces/hooks";
import { LinkButton } from "@/components/ui/link-button";
import { File, Folder } from "lucide-react";
import { type FunctionComponent, useEffect } from "react";

interface ColumnViewProps {
  prefix?: string;
  currentPath: string;
}

export const ColumnView: FunctionComponent<ColumnViewProps> = ({
  prefix,
  currentPath,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useDestinationList(prefix);

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching]);

  return data?.pages.map((page, i) => (
    <div key={`${prefix}${i}`}>
      {(page.entries ?? []).map((entry) => (
        <div
          key={entry.fullPath}
          className={currentPath === entry.fullPath ? "bg-secondary/80" : ""}
        >
          <LinkButton
            from={`/namespaces/${prefix ?? ""}`}
            to={encodeURIComponent(entry.name)}
          >
            {entry.destinationType === "FOLDER" ? <Folder /> : <File />}
            {entry.name}
          </LinkButton>
        </div>
      ))}
    </div>
  ));
};
