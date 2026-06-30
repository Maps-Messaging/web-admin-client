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

import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

const getAllConfigHandler = http.get("/api/v1/server/config", () =>
  HttpResponse.json([
    ...Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(
      () => ({
        id: faker.string.uuid(),
        name: faker.lorem.words(),
      }),
    ),
    { id: "MessageDaemonConfig", name: "Message Daemon Config" },
  ]),
);

export const configHandlers = [getAllConfigHandler];
