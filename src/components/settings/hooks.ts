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

import { apiClient, fetchClient } from "@/api/api-client";
import type { operations } from "@/api/spec";
import { useQuery } from "@tanstack/react-query";

const SERVER_CONFIG_ID = "MessageDaemonConfig";

export function useListConfigs() {
  return useQuery({
    queryKey: ["get", "/api/v1/server/config"],
    queryFn: async () => {
      const { data } = await fetchClient.GET("/api/v1/server/config");
      if (!data) return undefined;

      const serverConfigIndex =
        data?.findIndex(({ id }) => id === SERVER_CONFIG_ID) ?? -1;
      return data[serverConfigIndex]
        ? [
            data[serverConfigIndex],
            ...data.slice(0, serverConfigIndex),
            ...data.slice(serverConfigIndex + 1),
          ]
        : data;
    },
  });
}

export function useConfig(
  name: operations["getConfigSection"]["parameters"]["path"]["name"],
) {
  return apiClient.useQuery("get", "/api/v1/server/config/{name}", {
    params: { path: { name } },
  });
}
