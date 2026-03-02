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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FunctionComponent } from "react";
import { ColumnView } from "./column-view";

interface NamespaceNavigationCardProps {
  path?: string;
  maxDepth?: number;
}

const buildPathSegments = (path: string = ""): string[] => {
  const parts = path.split("/").filter(Boolean);
  const result: string[] = ["/"];

  let current = "";
  for (const part of parts) {
    current += "/" + part;
    result.push(current);
  }

  return result;
};

export const NamespaceNavigationCard: FunctionComponent<
  NamespaceNavigationCardProps
> = ({ path = "", maxDepth = 4 }) => {
  const segments = buildPathSegments(path).slice(-maxDepth);
  const shouldTranslate = segments.length === maxDepth;

  return (
    <Card className="overflow-scroll">
      <CardHeader>
        <CardTitle>{path}</CardTitle>
      </CardHeader>
      <CardContent
        className={`flex transition-transform w-182 ${
          shouldTranslate ? "-translate-x-24" : ""
        }`}
      >
        {segments.map((segment, index) => (
          <div className="w-52 border-x-2 shrink-0">
            <ColumnView
              prefix={segment}
              currentPath={index < segments.length ? segments[index + 1] : ""}
              key={`${segment}-${index}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
