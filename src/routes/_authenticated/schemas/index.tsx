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

import { useSchemas } from "@/components/schemas/hooks";
import { SchemaTable } from "@/components/schemas/schema-table";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/schemas/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useSchemas();

  return (
    <div className="px-6 flex flex-col gap-4 w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold">Schemas</h1>
      <SchemaTable schemas={data} />
    </div>
  );
}
