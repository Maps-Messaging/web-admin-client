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
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns3, List } from "lucide-react";
import { type FunctionComponent, useEffect, useRef, useState } from "react";
import { ColumnView } from "./column-view";

interface NamespaceNavigationCardProps {
  path?: string;
  className?: string;
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

const layouts = ["list", "columns"] as const;
type Layout = (typeof layouts)[number];

export const NamespaceNavigationCard: FunctionComponent<
  NamespaceNavigationCardProps
> = ({ path = "", className }) => {
  const [layout, setLayout] = useState<Layout>("list");

  const segments =
    layout === "columns"
      ? buildPathSegments(path)
      : buildPathSegments(path).slice(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const id = requestAnimationFrame(() => {
      el.scrollTo({
        left: el.scrollWidth,
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(id);
  }, [segments]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{path}</CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {layout === "columns" ? <Columns3 /> : <List />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup
                  value={layout}
                  onValueChange={(value) => setLayout(value as Layout)}
                >
                  <DropdownMenuRadioItem value="list">
                    <List />
                    List
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="columns">
                    <Columns3 />
                    Columns
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent ref={containerRef} className="overflow-x-auto">
        <div className="flex">
          {segments.map((segment, index) => (
            <div
              key={segment}
              className={layout === "columns" ? "w-64 border-x-2 shrink-0" : ""}
            >
              <ColumnView
                prefix={segment}
                currentPath={index < segments.length ? segments[index + 1] : ""}
                key={`${segment}-${index}`}
                includeParent={layout === "list"}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
