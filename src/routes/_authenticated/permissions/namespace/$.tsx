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

import { NamespaceNavigationCard } from "@/components/namespaces/namespace-navigation-card";
import { NamespaceDetailCard } from "@/components/permissions/namespace-detail-card";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_authenticated/permissions/namespace/$")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { _splat } = Route.useParams();
  const [activePath, setActivePath] = useState<string>(_splat ?? "");

  useEffect(() => {
    if (activePath !== _splat) {
      setActivePath(_splat ?? "");
    }
  }, [_splat]);

  return (
    <div className="px-6 flex flex-col gap-4">
      <h1 className="text-4xl font-extrabold">Namespace Permissions</h1>
      <div className="flex flex-row gap-2">
        <NamespaceNavigationCard
          baseUrl="/permissions/namespace"
          path={_splat}
          selectPath={setActivePath}
          className="flex-1"
        />
        <NamespaceDetailCard namespace={activePath} className="flex-3" />
      </div>
    </div>
  );
}
