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

import { apiClient } from "@/api/api-client";
import { queryClient } from "@/api/query-client";
import type { operations } from "@/api/spec";

export function useGroups({ nameFilter }: { nameFilter?: string } = {}) {
  return apiClient.useQuery("get", "/api/v1/auth/groups", {
    query: {
      filter: nameFilter,
    },
  });
}

export const useGroup = (
  groupUuid: operations["getGroupById"]["parameters"]["path"]["groupUuid"],
) => {
  return apiClient.useQuery("get", "/api/v1/auth/groups/{groupUuid}", {
    params: { path: { groupUuid } },
  });
};

export const useCreateGroup = () => {
  return apiClient.useMutation("post", "/api/v1/auth/groups", {
    onSettled: () =>
      queryClient.invalidateQueries(
        apiClient.queryOptions("get", "/api/v1/auth/groups"),
      ),
  });
};

export const useDeleteGroup = () => {
  return apiClient.useMutation("delete", "/api/v1/auth/groups/{groupUuid}", {
    onSettled: () =>
      queryClient.invalidateQueries(
        apiClient.queryOptions("get", "/api/v1/auth/groups"),
      ),
  });
};

export const useAddUserToGroup = () => {
  return apiClient.useMutation(
    "post",
    "/api/v1/auth/groups/{groupUuid}/{userUuid}",
    {
      onSettled: (_data, _error, variables) => {
        const { groupUuid, userUuid } = variables.params.path;
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/groups/{groupUuid}", {
            params: { path: { groupUuid } },
          }),
        );
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/users/{userUuid}", {
            params: { path: { userUuid } },
          }),
        );
      },
    },
  );
};

export const useRemoveUserFromGroup = () => {
  return apiClient.useMutation(
    "delete",
    "/api/v1/auth/groups/{groupUuid}/{userUuid}",
    {
      onSettled: (_data, _error, variables) => {
        const { groupUuid, userUuid } = variables.params.path;
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/groups/{groupUuid}", {
            params: { path: { groupUuid } },
          }),
        );
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/users/{userUuid}", {
            params: { path: { userUuid } },
          }),
        );
      },
    },
  );
};
