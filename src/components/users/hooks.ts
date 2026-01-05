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
import type { UserLock } from "@/components/users/models";
import { useMemo } from "react";

export function useUsers(filter?: string) {
  return apiClient.useQuery("get", "/api/v1/auth/users", {
    query: {
      filter,
    },
  });
}

export function useUsersWithLock({
  usernameFilter,
}: { usernameFilter?: string } = {}) {
  const userResult = apiClient.useQuery("get", "/api/v1/auth/users", {
    query: {
      filter: usernameFilter,
    },
  });

  const lockResult = apiClient.useQuery("get", "/api/v1/auth/user-lockouts");

  const lockByUuid = useMemo(() => {
    if (!lockResult.data) return new Map<string, UserLock>();

    return new Map(lockResult.data.map((item) => [item.uuid, item]));
  }, [lockResult.data]);

  const combinedData = useMemo(() => {
    if (!userResult.data) return [];

    return userResult.data.map((user) => ({
      ...lockByUuid.get(user.uniqueId),
      ...user,
    }));
  }, [userResult.data, lockByUuid]);

  return {
    data: combinedData,
    isLoading: userResult.isLoading || lockResult.isLoading,
    isSuccess: userResult.isSuccess && lockResult.isSuccess,
  };
}

export const useGetUser = (
  userUuid: operations["getUser"]["parameters"]["path"]["userUuid"],
  queryOptions: { enabled: boolean } | undefined,
) => {
  return apiClient.useQuery(
    "get",
    "/api/v1/auth/users/{userUuid}",
    {
      params: { path: { userUuid } },
    },
    queryOptions,
  );
};

export const useCreateUser = () => {
  return apiClient.useMutation("post", "/api/v1/auth/users", {
    onSettled: () =>
      queryClient.invalidateQueries(
        apiClient.queryOptions("get", "/api/v1/auth/users"),
      ),
  });
};

export const useDeleteUser = () => {
  return apiClient.useMutation("delete", "/api/v1/auth/users/{userUuid}", {
    onSettled: () =>
      queryClient.invalidateQueries(
        apiClient.queryOptions("get", "/api/v1/auth/users"),
      ),
  });
};

export const useUnlockUser = () => {
  return apiClient.useMutation(
    "delete",
    "/api/v1/auth/user-lockouts/{userUuid}",
    {
      onSettled: () =>
        queryClient.invalidateQueries(
          apiClient.queryOptions("get", "/api/v1/auth/user-lockouts"),
        ),
    },
  );
};

export const useResetUserPassword = () => {
  return apiClient.useMutation("put", "/api/v1/auth/users/{userUuid}/password");
};
