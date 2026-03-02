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
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Link } from "@tanstack/react-router";
import { File, Folder, FolderUp } from "lucide-react";
import { type FunctionComponent, useEffect } from "react";

interface ColumnViewProps {
  prefix?: string;
  currentPath: string;
  includeParent?: boolean;
}

export const ColumnView: FunctionComponent<ColumnViewProps> = ({
  prefix,
  currentPath,
  includeParent,
}) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useDestinationList(prefix);

  useEffect(() => {
    if (!isLoading && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching]);

  return (
    <>
      {includeParent && prefix ? (
        <Button
          variant="link"
          className="px-0 grow justify-start group"
          asChild
        >
          <Link
            from="/namespaces"
            to={`/namespaces/${prefix.substring(0, prefix.lastIndexOf("/"))}`}
          >
            <FolderUp />
            Parent
          </Link>
        </Button>
      ) : null}
      {data?.pages.map((page, i) => (
        <div key={`${prefix}${i}`}>
          {(page.entries ?? []).map((entry) => (
            <div
              key={`${entry.fullPath}-${entry.destinationType}`}
              className={
                currentPath === entry.fullPath ? "bg-secondary/80" : ""
              }
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
      ))}
    </>
  );
};
