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

export function useDestinationList(prefix?: string) {
  return apiClient.useInfiniteQuery(
    "get",
    "/api/v1/server/destination/list",
    {
      params: { query: { prefix } },
    },
    {
      pageParamName: "pageNumber",
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageNo < lastPage.totalPages - 1) {
          return lastPage.pageNo + 1;
        }
        return undefined;
      },
    },
  );
}

export function useDestinationDetail(
  destinationName: string,
  queryOptions?: { enabled: boolean } | undefined,
) {
  return apiClient.useQuery(
    "get",
    "/api/v1/server/destination/detail",
    {
      params: { query: { destinationName } },
    },
    queryOptions,
  );
}
