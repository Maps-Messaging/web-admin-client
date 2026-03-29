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
import { useGetSchema } from "@/components/schemas/hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/schemas/$schemaId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.fetchQuery(
      apiClient.queryOptions("get", "/api/v1/server/schemas/{schemaId}", {
        params: { path: { schemaId: params.schemaId } },
      }),
    );
    return { breadcrumb: data.name };
  },
});

function RouteComponent() {
  const { schemaId } = Route.useParams();
  const { data: schema } = useGetSchema(schemaId);

  return (
    <div className="flex flex-col gap-4 w-6xl mx-auto">
      <div className="px-6 flex items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold">{schema?.name}</h1>

      </div>
    </div>
  );
}
