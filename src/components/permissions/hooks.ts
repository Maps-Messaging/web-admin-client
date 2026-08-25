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
import { queryClient } from "@/api/query-client";
import { removePermissionEntry } from "@/components/permissions/models";
import type {
  AggregatedPermissions,
  NamespaceAcl,
  NamespaceAclItem,
} from "@/components/permissions/models";
import { getNamespaceHierarchy } from "@/lib/namespace";
import { useQueries } from "@tanstack/react-query";

export function useNamespacePermissions(
  namespace: string,
  type: string,
): AggregatedPermissions {
  const paths = getNamespaceHierarchy(namespace);
  return useQueries({
    queries: paths.map((path, index) =>
      apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
        params: {
          query: {
            resourceType: index === 0 ? type : "FOLDER",
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

export function usePermissionList() {
  return apiClient.useQuery("get", "/api/v1/auth/permissions");
}

export function useResourcePermissions(resourceKey: string, type: string) {
  return apiClient.useQuery("get", "/api/v1/auth/resources/acl", {
    params: {
      query: {
        resourceType: type,
        resourceKey,
      },
    },
  });
}

const updateNamespacePermissions = (namespace: string, type: string) => {
  return apiClient.useMutation("put", "/api/v1/auth/resources/acl", {
    onSettled: () => {
      const paths = getNamespaceHierarchy(namespace);
      paths.forEach((path, index) => {
        console.log(
          `Invalidating ${JSON.stringify({
            resourceType: index === 0 ? type : "FOLDER",
            resourceKey: path,
          })}`,
        );
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
            params: {
              query: {
                resourceType: index === 0 ? type : "FOLDER",
                resourceKey: path,
              },
            },
          }),
        );
      });
    },
  });
};

export const useAddNamespacePermission = (namespace: string, type: string) => {
  const { mutate, ...restMutation } = updateNamespacePermissions(
    namespace,
    type,
  );

  const addMutation = (
    permission: NamespaceAclItem,
    options?: Parameters<
      ReturnType<typeof updateNamespacePermissions>["mutate"]
    >[1],
  ) => {
    const data = queryClient.getQueryData<NamespaceAcl>(
      apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
        params: {
          query: {
            resourceType: type,
            resourceKey: namespace,
          },
        },
      }).queryKey,
    );

    const entries = [...(data?.entries ?? []), permission];

    mutate(
      {
        body: {
          resourceKey: namespace,
          resourceType: type,
          entries,
        },
      },
      options,
    );
  };

  return {
    ...restMutation,
    mutate: addMutation,
  };
};

export const useEditNamespacePermission = (namespace: string, type: string) => {
  const { mutate, ...restMutation } = updateNamespacePermissions(
    namespace,
    type,
  );

  const editMutation = (
    permission: NamespaceAclItem,
    options?: Parameters<
      ReturnType<typeof updateNamespacePermissions>["mutate"]
    >[1],
  ) => {
    const data = queryClient.getQueryData<NamespaceAcl>(
      apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
        params: {
          query: {
            resourceType: type,
            resourceKey: namespace,
          },
        },
      }).queryKey,
    );

    const entries = (data?.entries ?? []).map((acl) => {
      if (
        acl.principalId === permission.principalId &&
        acl.principalType === permission.principalType
      ) {
        return permission;
      }
      return acl;
    });

    mutate(
      {
        body: {
          resourceKey: namespace,
          resourceType: type,
          entries,
        },
      },
      options,
    );
  };

  return {
    ...restMutation,
    mutate: editMutation,
  };
};
export const useDeleteNamespacePermission = (
  namespace: string,
  type: string,
) => {
  const { mutate, ...restMutation } = updateNamespacePermissions(
    namespace,
    type,
  );

  const deleteMutation = (
    permission: NamespaceAclItem,
    options?: Parameters<
      ReturnType<typeof updateNamespacePermissions>["mutate"]
    >[1],
  ) => {
    const data = queryClient.getQueryData<NamespaceAcl>(
      apiClient.queryOptions("get", "/api/v1/auth/resources/acl", {
        params: {
          query: {
            resourceType: type,
            resourceKey: namespace,
          },
        },
      }).queryKey,
    );

    const entries = removePermissionEntry(data?.entries ?? [], permission);

    mutate(
      {
        body: {
          resourceKey: namespace,
          resourceType: type,
          entries,
        },
      },
      options,
    );
  };

  return {
    ...restMutation,
    mutate: deleteMutation,
  };
};
