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
import type { components } from "@/api/spec";

export type NamespaceAcl = components["schemas"]["AclResourceViewDTO"];

export type NamespaceAclItem = components["schemas"]["AclEntryDTO"];

export interface InheritedPermissions extends NamespaceAclItem {
  source: string;
}

export interface AggregatedPermissions {
  explicitPermissions: NamespaceAclItem[];
  inheritedPermissions: InheritedPermissions[];
  isLoading: boolean;
  isError: boolean;
}

export function isInheritedPermission(
  acl: NamespaceAclItem | InheritedPermissions,
): acl is InheritedPermissions {
  return "source" in acl && typeof acl.source === "string";
}
