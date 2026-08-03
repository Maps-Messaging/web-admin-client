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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { getNamespaceHierarchy } from "@/lib/namespace";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Link } from "@tanstack/react-router";
import { File, Folder, FolderUp, FolderDown } from "lucide-react";
import { type FunctionComponent, useEffect } from "react";

interface NamespaceNavigationCardProps {
  baseUrl: FileRouteTypes["fullPaths"];
  path?: string;
  selectPath: (path: string) => void;
  className?: string;
}

export const NamespaceNavigationCard: FunctionComponent<
  NamespaceNavigationCardProps
> = ({ baseUrl, path = "", selectPath, className }) => {
  const pathParts = getNamespaceHierarchy(path);
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useDestinationList(path);

  useEffect(() => {
    if (!isLoading && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching]);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle onClick={() => selectPath(path)} className="cursor-pointer">
          {path ? path : "<root>"}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="flex-col">
          <div className="flex">
            {path ? (
              <Button
                variant="link"
                className="px-0 grow justify-start group"
                nativeButton={false}
                render={
                  <Link
                    from={baseUrl}
                    to={
                      pathParts.length > 1
                        ? `${baseUrl}/${pathParts[1]}`
                        : baseUrl
                    }
                  />
                }
              >
                <FolderUp />
                Parent
              </Button>
            ) : null}
            <Button
              variant="link"
              onClick={() => selectPath(path)}
              className="px-0 grow justify-start group cursor-pointer"
            >
              <FolderDown />
              Current namespace
            </Button>
          </div>
          <hr />
          {data?.pages.map((page, i) => (
            <div key={`${path}${i}`}>
              {(page.entries ?? []).map((entry) => (
                <div
                  key={`${entry.fullPath}-${entry.destinationType}`}
                  className={path === entry.fullPath ? "bg-secondary/80" : ""}
                >
                  {entry.destinationType === "FOLDER" ? (
                    <LinkButton
                      from={baseUrl}
                      to={encodeURIComponent(entry.fullPath)}
                    >
                      <Folder />
                      {entry.name}
                    </LinkButton>
                  ) : (
                    <Button
                      variant="link"
                      onClick={() => selectPath(entry.fullPath)}
                      className="px-0 grow justify-start group cursor-pointer"
                    >
                      <File />
                      {entry.name}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
