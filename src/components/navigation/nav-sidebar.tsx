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

import { useServerInfo } from "@/components/navigation/hooks";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { ServerSwitcher } from "@/components/navigation/server-switcher";
import { useListConfigs } from "@/components/settings/hooks";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Box,
  Boxes,
  BrainCircuit,
  Cable,
  Cpu,
  DatabaseZap,
  EthernetPort,
  Form,
  Logs,
  Settings2,
  Users,
} from "lucide-react";
import * as React from "react";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: serverInfo } = useServerInfo();
  const { data: configList, isLoading } = useListConfigs();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    servers: (name: string) => [
      {
        name,
        logo: Box,
      },
      {
        name: "Server A",
        logo: Box,
      },
      {
        name: "Server B",
        logo: Box,
      },
      {
        name: "Cluster",
        logo: Boxes,
      },
    ],
    navMain: [
      {
        title: "Namespaces",
        url: "/namespaces",
        icon: Box,
      },
      {
        title: "State Cache",
        url: "/cache",
        icon: DatabaseZap,
      },
      {
        title: "Connections",
        url: "/connections",
        icon: Cable,
      },
      {
        title: "Schemas",
        url: "/schemas",
        icon: Form,
      },
      {
        title: "Interfaces",
        url: "/interfaces",
        icon: EthernetPort,
      },
      {
        title: "Devices",
        url: "/devices",
        icon: Cpu,
      },
      { title: "Logging", url: "/logging", icon: Logs },
      { title: "Models", url: "/models", icon: BrainCircuit },
      {
        title: "People",
        url: "/people",
        icon: Users,
        items: [
          { title: "Users", url: "/people/users" },
          { title: "Groups", url: "/people/groups" },
          { title: "Permissions", url: "/people/permissions" },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        items: (configList ?? []).map(({ name, id }) => ({
          title: name,
          url: `/settings/${id}`,
        })),
      },
    ],
    navTree: [
      "Namespaces",
      "Region-1",
      ["Region-2", ["Zone-1", "Node 1", ["Node 2", "Service 1"]], "Zone-2"],
      "Region-3",
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ServerSwitcher
          servers={data.servers(serverInfo?.serverName ?? "abc")}
        />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? null : <NavMain items={data.navMain} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
