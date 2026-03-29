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

export const useSchemas = ({ nameFilter }: { nameFilter?: string } = {}) =>
  apiClient.useQuery("get", "/api/v1/server/schemas", {
    query: {
      filter: nameFilter,
    },
  });

export const useGetSchema = (schemaId: string) => {
  return apiClient.useQuery("get", "/api/v1/server/schemas/{schemaId}", {
    params: { path: { schemaId } },
  });
};

export const useDeleteSchema = () =>
  apiClient.useMutation("delete", "/api/v1/server/schemas/{schemaId}", {
    onSettled: () =>
      queryClient.invalidateQueries(
        apiClient.queryOptions("get", "/api/v1/server/schemas"),
      ),
  });
