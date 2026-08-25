/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  getPermissionsForResource,
  removePermissionEntry,
  type NamespaceAclItem,
  type PermissionDetails,
} from "@/components/permissions/models";
import { describe, expect, it } from "vitest";

const permissions: PermissionDetails[] = [
  {
    schemaLoadingVersion: 1,
    name: "connect",
    description: "Connect to the server",
    server: true,
  },
  {
    schemaLoadingVersion: 1,
    name: "publish",
    description: "Publish to a destination",
    server: false,
  },
];

describe("getPermissionsForResource", () => {
  it("returns only server permissions for a server resource", () => {
    expect(getPermissionsForResource(permissions, "Server")).toEqual([
      permissions[0],
    ]);
  });

  it("returns only destination permissions for namespace resources", () => {
    expect(getPermissionsForResource(permissions, "TOPIC")).toEqual([
      permissions[1],
    ]);
  });
});

describe("removePermissionEntry", () => {
  it("removes only the selected principal and effect", () => {
    const selected: NamespaceAclItem = {
      principalType: "IDENTITY",
      principalId: "user-1",
      effect: "ALLOW",
      permissions: ["connect"],
    };
    const denied: NamespaceAclItem = {
      ...selected,
      effect: "DENY",
      permissions: ["manage_config"],
    };
    const group: NamespaceAclItem = {
      principalType: "GROUP",
      principalId: "group-1",
      effect: "ALLOW",
      permissions: ["view_config"],
    };

    expect(removePermissionEntry([selected, denied, group], selected)).toEqual([
      denied,
      group,
    ]);
  });
});
