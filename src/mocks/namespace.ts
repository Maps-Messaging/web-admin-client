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
import type { components } from "@/api/spec";
import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

const mockNamespaceList = (
  path: string | null,
): components["schemas"]["DestinationEntry"] => {
  const baseName = faker.system.fileName({ extensionCount: 0 });
  const prefix = !path && faker.datatype.boolean(0.75) ? "/" : "";

  const name = `${prefix}${baseName}`;

  const type = faker.helpers.arrayElement([
    "FOLDER",
    "TOPIC",
    "QUEUE",
    "TEMP_TOPIC",
    "TEMP_QUEUE",
    null,
  ]);
  return {
    name,
    fullPath: path ? `${path}/${name}` : name,
    destinationType: type ?? "FOLDER",
    childCount: type === "FOLDER" ? faker.number.int(50) : 0,
  };
};

const namespaceListHandler = http.get<
  never,
  undefined,
  components["schemas"]["DestinationPageResponse"]
>("/api/v1/server/destination/list", ({ request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("prefix");

  return HttpResponse.json({
    totalEntries: faker.number.int(500),
    totalPages: faker.number.int(10),
    pageNo: faker.number.int(10),
    entries: Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
      () => mockNamespaceList(path),
    ),
  });
});

export const namespaceHandlers = [namespaceListHandler];
