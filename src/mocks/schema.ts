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

import type { components } from "@/api/spec";
import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

// ---- Helpers ----
const maybe = <T>(fn: () => T): T | undefined =>
  faker.datatype.boolean() ? fn() : undefined;

const maybeNull = <T>(fn: () => T): T | null | undefined =>
  faker.helpers.arrayElement([fn(), null, undefined]);

const MAX_DEPTH = 2;

// ---- JsonPrimitive ----
const mockJsonPrimitive = (depth = 0): any => ({
  asInt: maybe(() => faker.number.int()),
  asDouble: maybe(() => faker.number.float()),
  asLong: maybe(() => faker.number.int({ max: Number.MAX_SAFE_INTEGER })),
  asBoolean: maybe(() => faker.datatype.boolean()),
  string: maybe(() => true),
  asByte: maybe(() => faker.string.alphanumeric(8)),
  asFloat: maybe(() => faker.number.float()),
  asShort: maybe(() => faker.number.int({ max: 32767 })),
  boolean: maybe(() => true),
  number: maybe(() => true),
  asNumber: maybe(() => faker.number.float()),
  asCharacter: maybe(() => faker.string.alpha({ length: 1 })),
  asBigDecimal: maybe(() => faker.number.float()),
  asBigInteger: maybe(() => faker.number.int()),
  asString: maybe(() => faker.lorem.word()),
  jsonNull: maybe(() => false),
  jsonPrimitive: maybe(() => true),
  ...(depth < MAX_DEPTH && {
    asJsonNull: maybe(() => mockJsonNull(depth + 1)),
    asJsonObject: maybe(() => mockJsonObject(depth + 1)),
    asJsonPrimitive: maybe(() => mockJsonPrimitive(depth + 1)),
    asJsonArray: maybe(() => mockJsonArray(depth + 1)),
  }),
});

// ---- JsonNull ----
const mockJsonNull = (depth = 0): any => ({
  asInt: maybe(() => faker.number.int()),
  asDouble: maybe(() => faker.number.float()),
  asLong: maybe(() => faker.number.int()),
  asBoolean: maybe(() => false),
  asByte: maybe(() => faker.string.alphanumeric(8)),
  asFloat: maybe(() => faker.number.float()),
  jsonNull: true,
  asShort: maybe(() => faker.number.int()),
  asNumber: maybe(() => faker.number.float()),
  asCharacter: maybe(() => faker.string.alpha({ length: 1 })),
  jsonObject: maybe(() => false),
  asBigDecimal: maybe(() => faker.number.float()),
  asBigInteger: maybe(() => faker.number.int()),
  jsonPrimitive: maybe(() => false),
  asString: maybe(() => ""),
  jsonArray: maybe(() => false),
  ...(depth < MAX_DEPTH && {
    asJsonNull: maybe(() => mockJsonNull(depth + 1)),
    asJsonObject: maybe(() => mockJsonObject(depth + 1)),
    asJsonPrimitive: maybe(() => mockJsonPrimitive(depth + 1)),
    asJsonArray: maybe(() => mockJsonArray(depth + 1)),
  }),
});

// ---- JsonObject ----
const mockJsonObject = (depth = 0): any => ({
  empty: maybe(() => false),
  asInt: maybe(() => faker.number.int()),
  asDouble: maybe(() => faker.number.float()),
  asLong: maybe(() => faker.number.int()),
  asBoolean: maybe(() => faker.datatype.boolean()),
  asByte: maybe(() => faker.string.alphanumeric(8)),
  asFloat: maybe(() => faker.number.float()),
  jsonNull: maybe(() => false),
  asShort: maybe(() => faker.number.int()),
  asNumber: maybe(() => faker.number.float()),
  asCharacter: maybe(() => faker.string.alpha({ length: 1 })),
  jsonObject: true,
  asBigDecimal: maybe(() => faker.number.float()),
  asBigInteger: maybe(() => faker.number.int()),
  jsonPrimitive: maybe(() => false),
  asString: maybe(() => faker.lorem.word()),
  jsonArray: maybe(() => false),

  ...(depth < MAX_DEPTH && {
    asJsonNull: maybe(() => mockJsonNull(depth + 1)),
    asJsonObject: maybe(() => mockJsonObject(depth + 1)),
    asJsonPrimitive: maybe(() => mockJsonPrimitive(depth + 1)),
    asJsonArray: maybe(() => mockJsonArray(depth + 1)),
  }),
});

// ---- JsonArray ----
const mockJsonArray = (depth = 0): any => ({
  empty: maybe(() => false),
  asInt: maybe(() => faker.number.int()),
  asDouble: maybe(() => faker.number.float()),
  asLong: maybe(() => faker.number.int()),
  asBoolean: maybe(() => faker.datatype.boolean()),
  asByte: maybe(() => faker.string.alphanumeric(8)),
  asFloat: maybe(() => faker.number.float()),
  asShort: maybe(() => faker.number.int()),
  asNumber: maybe(() => faker.number.float()),
  asCharacter: maybe(() => faker.string.alpha({ length: 1 })),
  asBigDecimal: maybe(() => faker.number.float()),
  asBigInteger: maybe(() => faker.number.int()),
  asString: maybe(() => faker.lorem.word()),
  jsonNull: maybe(() => false),
  jsonObject: maybe(() => false),
  jsonPrimitive: maybe(() => false),
  jsonArray: true,

  ...(depth < MAX_DEPTH && {
    asJsonNull: maybe(() => mockJsonNull(depth + 1)),
    asJsonObject: maybe(() => mockJsonObject(depth + 1)),
    asJsonPrimitive: maybe(() => mockJsonPrimitive(depth + 1)),
    asJsonArray: maybe(() => mockJsonArray(depth + 1)),
  }),
});

// ---- SchemaConfigDTO ----
export const mockSchemaConfigDTO =
  (): components["schemas"]["SchemaConfigDTO"] => ({
    uniqueId: faker.string.uuid(),
    versionId: maybeNull(() =>
      faker.number.int({ min: 1, max: 10 }).toString(),
    ),
    epoch: maybeNull(() => faker.number.int({ min: 1_600_000_000 })),
    name: maybeNull(() => faker.commerce.productName()),
    description: maybeNull(() => faker.lorem.sentence()),
    documentation: maybeNull(() => faker.internet.url()),
    labels: maybeNull(() =>
      Object.fromEntries(
        Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => [
          faker.lorem.word(),
          faker.helpers.arrayElement([faker.lorem.word(), null]),
        ]),
      ),
    ),
    ancestor: maybeNull(() => faker.string.uuid()),
    format: maybeNull(() =>
      faker.helpers.arrayElement(["json", "avro", "xml"]),
    ),
    schemaUrl: maybeNull(() => faker.internet.url()),

    // Either schema OR schemaBase64
    ...(faker.datatype.boolean()
      ? {
          schema: mockJsonObject(0),
          schemaBase64: null,
        }
      : {
          schema: null,
          schemaBase64: btoa(JSON.stringify(mockJsonObject(0))),
        }),

    createdAt: maybeNull(() => faker.date.past().toISOString()),
    modifiedAt: maybeNull(() => faker.date.recent().toISOString()),
    notBefore: maybeNull(() => faker.date.past().toISOString()),
    expiresAfter: maybeNull(() => faker.date.future().toISOString()),
  });

const getAllSchemasHandler = http.get("/api/v1/server/schemas", () =>
  HttpResponse.json(
    Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() =>
      mockSchemaConfigDTO(),
    ),
  ),
);

const addSchemaHandler = http.post("/api/v1/server/schemas", () =>
  HttpResponse.json(mockSchemaConfigDTO()),
);

const getSchemaByIdHandler = http.get("/api/v1/server/schemas/:schemaId", () =>
  HttpResponse.json(mockSchemaConfigDTO()),
);

export const schemaHandlers = [
  getAllSchemasHandler,
  addSchemaHandler,
  getSchemaByIdHandler,
];
