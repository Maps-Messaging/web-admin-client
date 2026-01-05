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

import * as React from "react";
import {
  Box,
  Boxes,
  BrainCircuit,
  Cable,
  EthernetPort,
  Form,
  Logs,
  Settings2,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { ServerSwitcher } from "@/components/navigation/server-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavTree } from "./nav-tree";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  servers: [
    {
      name: "Cluster",
      logo: Boxes,
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
      name: "Server C",
      logo: Box,
    },
  ],
  navMain: [
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
      items: [
        { title: "Hardware", url: "/interfaces/hardware" },
        { title: "LORA", url: "/interfaces/lora" },
      ],
    },
    { title: "Logging", url: "/logging", icon: Logs },
    { title: "Models", url: "/models", icon: BrainCircuit },
    {
      title: "Admin",
      url: "/admin",
      icon: Users,
      items: [
        { title: "Users", url: "/admin/users" },
        { title: "Groups", url: "/admin/groups" },
      ],
    },
    { title: "Settings", url: "/settings", icon: Settings2 },
  ],
  navTree: [
    "Namespaces",
    "Region-1",
    ["Region-2", ["Zone-1", "Node 1", ["Node 2", "Service 1"]], "Zone-2"],
    "Region-3",
  ],
};

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ServerSwitcher servers={data.servers} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTree item={data.navTree} label="Namespaces" basePath="/" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
