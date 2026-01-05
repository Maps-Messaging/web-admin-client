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

import { Braces, ChevronRight, Folder } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import { useIsRouteActive } from "@/hooks/use-is-route-active";
import { Link } from "@tanstack/react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type TreeItem = string | TreeItem[];

function NavTreeItem({ item, basePath }: { item: TreeItem; basePath: string }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const path = `${basePath}/${name}`;
  const isActive = useIsRouteActive(path, !items.length);
  // Leaf
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={isActive}
        className="data-[active=true]:bg-transparent nowrap"
      >
        <Braces />
        <Link to={path}>{name}</Link>
      </SidebarMenuButton>
    );
  }

  // Branch
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={isActive} className="nowrap">
            <ChevronRight className="transition-transform" />
            <Folder />
            <Link to={path}>{name}</Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {items
              .sort((a, b) =>
                Array.isArray(a) && !Array.isArray(b)
                  ? -1
                  : Array.isArray(b) && !Array.isArray(a)
                    ? 1
                    : 0,
              )
              .map((subItem, index) => (
                <NavTreeItem key={index} item={subItem} basePath={path} />
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function NavTree({
  item,
  label,
  basePath,
}: {
  item: TreeItem;
  label: string;
  basePath: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        <NavTreeItem item={item} basePath={basePath} />
      </SidebarMenu>
    </SidebarGroup>
  );
}
