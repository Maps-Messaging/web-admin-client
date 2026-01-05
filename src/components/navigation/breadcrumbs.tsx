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

import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useState } from "react";

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();
  useState(breadcrumbs);
  const lastIndex = breadcrumbs.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs
          .map((crumb, index) => {
            const isLast = index === lastIndex;

            return [
              <BreadcrumbItem key={crumb.to}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.to}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>,
              !isLast && <BreadcrumbSeparator key={`separator-${index}`} />,
            ];
          })
          .flat()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
