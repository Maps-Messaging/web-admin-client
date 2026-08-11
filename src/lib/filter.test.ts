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

import { describe, it, expect } from "vitest";
import { search } from "./filter";

describe("search", () => {
  describe("Basic String Searching (No Selector)", () => {
    const fruits = ["Apple", "Banana", "Cherry", "Date"];

    it("should return the provided array if no query is provided", () => {
      expect(search(fruits, "")).toEqual(fruits);
    });

    it("should perform case-insensitive matching", () => {
      expect(search(fruits, "APPLE")).toEqual(["Apple"]);
      expect(search(fruits, "apple")).toEqual(["Apple"]);
    });

    it("should find partial matches (substrings)", () => {
      expect(search(fruits, "an")).toEqual(["Banana"]);
    });

    it("should return an empty array if no matches are found", () => {
      expect(search(fruits, "Zucchini")).toEqual([]);
    });
  });
  describe("Object Searching (With Selector)", () => {
    interface User {
      id: number;
      name: string;
      email: string;
    }

    const users: User[] = [
      { id: 1, name: "Alice Müller", email: "alice@test.com" },
      { id: 2, name: "Bob Smith", email: "bob@work.com" },
      { id: 3, name: "Chloë García", email: "chloe@mail.es" },
    ];

    it("should filter objects based on a specific property via selector", () => {
      const result = search(users, "alice", (u) => u.name);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alice Müller");
    });

    it("should allow searching across multiple properties via a custom selector", () => {
      // Searching for 'work' which is in the email, but not the name
      const result = search(users, "work", (u) => `${u.name} ${u.email}`);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob Smith");
    });

    it("should return an empty array if the selector property doesn't match", () => {
      const result = search(users, "Zelda", (u) => u.name);
      expect(result).toEqual([]);
    });
  });

  describe("Normalization & Robustness (Accents and Whitespace)", () => {
    it("should ignore accents/diacritics (e.g., 'cafe' matches 'café')", () => {
      const items = ["Café", "München", "Niño"];
      expect(search(items, "cafe")).toEqual(["Café"]);
      expect(search(items, "munchen")).toEqual(["München"]);
      expect(search(items, "nino")).toEqual(["Niño"]);
    });

    it("should handle leading/trailing whitespace in the query", () => {
      const items = ["Apple", "Banana"];
      expect(search(items, "  apple  ")).toEqual(["Apple"]);
    });

    it("should handle extra spaces within strings via normalization", () => {
      // This tests if the 'trim' logic in our normalize function handles item cleaning
      const items = ["  Apple  ", "Banana"];
      expect(search(items, "apple")).toEqual(["  Apple  "]);
    });
  });

  describe("Edge Cases (Null, Undefined, and Errors)", () => {
    it("should not crash if the selector returns null or undefined", () => {
      interface Data {
        val: string | null | undefined;
      }
      const list: Data[] = [
        { val: "Hello" },
        { val: null },
        { val: undefined },
      ];

      // Should only return the one that is a valid string
      expect(search(list, "hello", (d) => d.val)).toEqual([{ val: "Hello" }]);
    });

    it("should handle an empty input list", () => {
      expect(search([], "test")).toEqual([]);
    });

    it("should skip items where the selector does not return a string", () => {
      const mixed = [{ v: "test" }, { v: 123 as any }, { v: null as any }];
      // Searching for 'test' should ignore the number and null
      expect(search(mixed, "test", (m) => m.v)).toEqual([{ v: "test" }]);
    });
  });
});
