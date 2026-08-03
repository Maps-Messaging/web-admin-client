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

export const getNamespaceHierarchy = (path: string): string[] => {
  const paths: string[] = [path];
  let current = path;

  // Continue as long as there is a slash to split on
  while (current.includes("/")) {
    const lastSlashIndex = current.lastIndexOf("/");

    // EDGE CASE: The only slash left is at the very start (e.g., "/a")
    // This means the next parent is just the root "/"
    if (lastSlashIndex === 0) {
      paths.push("/");
      break;
    }

    // Extract the parent by trimming everything after the last slash
    current = current.substring(0, lastSlashIndex);

    // Safety check: if we've reduced to an empty string (can happen with trailing slashes), stop.
    if (current === "") break;

    paths.push(current);
  }

  // Return unique paths only (in case of weirdly formatted input like "a/b/")
  return Array.from(new Set(paths));
};
