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

import { apiClient } from "@/api/api-client";
import type { AggregatedPermissions } from "@/components/permissions/models";
import { getNamespaceHierarchy } from "@/lib/namespace";
import { useQueries } from "@tanstack/react-query";

export function useNamespacePermissions(
  namespace: string,
): AggregatedPermissions {
  const paths = getNamespaceHierarchy(namespace);
  return useQueries({
    queries: paths.map((path) =>
      apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
        params: {
          query: {
            resourceType: path,
            resourceKey: path,
          },
        },
      }),
    ),
    combine: (queryResults): AggregatedPermissions => {
      const [explicitPermissions, ...inheritedPermissions] = queryResults;
      return {
        explicitPermissions: explicitPermissions?.data?.entries ?? [],

        inheritedPermissions: inheritedPermissions
          .filter((result) => result.data?.entries)
          .map((result) => {
            return (
              result.data?.entries.map((entry) => ({
                ...entry,
                source: result.data?.resourceKey ?? "",
              })) || []
            );
          })
          .flat(),
        isLoading: queryResults.some((r) => r.isLoading),
        isError: queryResults.some((r) => r.isError),
      };
    },
  });
}
