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

import { useListConfigs } from "@/components/settings/hooks";
import { LinkButton } from "@/components/ui/link-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListConfigs();
  return (
    <div className="w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold">Settings</h1>
      <div className="flex flex-col">
        {(data ?? []).map(({ id, name }) => (
          <LinkButton key={id} to={`/settings/${id}`}>
            {name}
          </LinkButton>
        ))}
      </div>
    </div>
  );
}
