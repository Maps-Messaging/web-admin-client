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

import { useMatches } from "@tanstack/react-router";

type Crumb = {
  label: string;
  to?: string;
};

function hasBreadcrumb(x: unknown): x is { breadcrumb: string } {
  return !!x && (x as any).breadcrumb !== undefined;
}

function hasSplatParams(p: unknown): p is { _splat: string } {
  return !!p && typeof (p as any)._splat === "string";
}

export function useBreadcrumbs(): Crumb[] {
  const matches = useMatches();

  const crumbs: Crumb[] = [];

  for (const match of matches) {
    // Normal (pathless / static) crumbs
    if (hasBreadcrumb(match.staticData)) {
      crumbs.push({
        label: match.staticData.breadcrumb,
        to: match.pathname,
      });
      continue;
    }
    if (hasBreadcrumb(match.loaderData)) {
      crumbs.push({
        label: match.loaderData.breadcrumb,
        to: match.pathname,
      });
      continue;
    }

    // Splat route handling
    if (hasSplatParams(match._strictParams)) {
      const parts = match.params._splat.split("/");

      let basePath = match.fullPath.replace("$", "");

      for (const part of parts) {
        basePath += `/${part}`;

        crumbs.push({
          label: part,
          to: basePath,
        });
      }
    }
  }

  return crumbs;
}
