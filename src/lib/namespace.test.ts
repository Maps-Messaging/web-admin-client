import { describe, it, expect } from "vitest";
import { getNamespaceHierarchy } from "./namespace";

describe("getNamespaceHierarchy", () => {
  it("should return the path itself when no slashes are present", () => {
    expect(getNamespaceHierarchy("root")).toEqual(["root"]);
  });

  it("should return correct hierarchy for simple path", () => {
    expect(getNamespaceHierarchy("a/b/c")).toEqual(["a/b/c", "a/b", "a"]);
  });

  it("should handle root path correctly", () => {
    expect(getNamespaceHierarchy("/")).toEqual(["/"]);
  });

  it("should handåle paths starting with slash correctly", () => {
    expect(getNamespaceHierarchy("/a/b/c")).toEqual([
      "/a/b/c",
      "/a/b",
      "/a",
      "/",
    ]);
  });

  it("should handle paths ending with slash correctly", () => {
    expect(getNamespaceHierarchy("a/b/c/")).toEqual([
      "a/b/c/",
      "a/b/c",
      "a/b",
      "a",
    ]);
  });

  it("should handle multiple consecutive slashes", () => {
    expect(getNamespaceHierarchy("a///b")).toEqual(["a///b", "a//", "a/", "a"]);
  });

  it("should return unique paths only (no duplicates)", () => {
    expect(getNamespaceHierarchy("a/a")).toEqual(["a/a", "a"]);
  });

  it("should handle edge case with slash at start only", () => {
    expect(getNamespaceHierarchy("/a")).toEqual(["/a", "/"]);
  });

  it("should handle complex namespace hierarchy", () => {
    expect(getNamespaceHierarchy("org/company/project/module")).toEqual([
      "org/company/project/module",
      "org/company/project",
      "org/company",
      "org",
    ]);
  });
});
