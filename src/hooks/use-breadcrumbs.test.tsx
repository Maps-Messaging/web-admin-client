import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBreadcrumbs } from "./use-breadcrumbs";

// Custom wrapper to provide router context (using your mock approach)
export function renderHookWithRouter<TProps, TResult>(
  hook: (props: TProps) => TResult,
  options?: { initialLocation?: string },
) {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({
      initialEntries: [options?.initialLocation ?? "/"],
    }),
  });

  const wrapper = () => <RouterProvider router={router} />;

  return { ...renderHook(hook, { wrapper }), router };
}

describe("useBreadcrumbs", () => {
  it("should return empty array when no breadcrumbs are defined", () => {
    const { result } = renderHookWithRouter(() => useBreadcrumbs(), {
      initialLocation: "/",
    });

    expect(result.current).toEqual([]);
  });

  it("should return a single breadcrumb for the root route", () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      staticData: { breadcrumb: "Home" },
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([indexRoute]),
      history: createMemoryHistory({
        initialEntries: ["/"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Home",
        to: "/",
      },
    ]);
  });

  it("should return multiple breadcrumbs for nested routes", () => {
    const rootRoute = createRootRoute();
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      staticData: { breadcrumb: "Dashboard" },
    });
    const peopleRoute = createRoute({
      getParentRoute: () => dashboardRoute,
      path: "/people",
      staticData: { breadcrumb: "People" },
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([
        dashboardRoute.addChildren([peopleRoute]),
      ]),
      history: createMemoryHistory({
        initialEntries: ["/dashboard/people"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Dashboard",
        to: "/dashboard",
      },
      {
        label: "People",
        to: "/dashboard/people",
      },
    ]);
  });

  it("should handle splat routes correctly", () => {
    const rootRoute = createRootRoute();
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      staticData: { breadcrumb: "Dashboard" },
    });
    const filesRoute = createRoute({
      getParentRoute: () => dashboardRoute,
      path: "/files/$",
      staticData: { breadcrumb: "Files" },
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([
        dashboardRoute.addChildren([filesRoute]),
      ]),
      history: createMemoryHistory({
        initialEntries: ["/dashboard/files/some/path/within/files"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Dashboard",
        to: "/dashboard",
      },
      {
        label: "Files",
        to: "/dashboard/files",
      },
      {
        label: "some",
        to: "/dashboard/files/some",
      },
      {
        label: "path",
        to: "/dashboard/files/some/path",
      },
      {
        label: "within",
        to: "/dashboard/files/some/path/within",
      },
      {
        label: "files",
        to: "/dashboard/files/some/path/within/files",
      },
    ]);
  });

  it("should handle loaderData breadcrumb definitions", () => {
    const rootRoute = createRootRoute();
    const dashboardRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      loader: () => ({ breadcrumb: "Dashboard (loaded)" }),
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([dashboardRoute]),
      history: createMemoryHistory({
        initialEntries: ["/dashboard"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Dashboard (loaded)",
        to: "/dashboard",
      },
    ]);
  });

  it("should handle simple MQTT namespace path", () => {
    const rootRoute = createRootRoute();
    const namespacesRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/namespaces",
      staticData: { breadcrumb: "Namespaces" },
    });
    const namespaceSplatRoute = createRoute({
      getParentRoute: () => namespacesRoute,
      path: "/$",
      staticData: { breadcrumb: "Namespace" },
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([
        namespacesRoute.addChildren([namespaceSplatRoute]),
      ]),
      history: createMemoryHistory({
        initialEntries: ["/namespaces/test"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Namespaces",
        to: "/namespaces",
      },
      {
        label: "Namespace",
        to: "/namespaces",
      },
      {
        label: "test",
        to: "/namespaces/test",
      },
    ]);
  });

  it("should handle hierarchical MQTT namespace path", () => {
    const rootRoute = createRootRoute();
    const namespacesRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/namespaces",
      staticData: { breadcrumb: "Namespaces" },
    });
    const namespaceSplatRoute = createRoute({
      getParentRoute: () => namespacesRoute,
      path: "/$",
      staticData: { breadcrumb: "Namespace" },
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([
        namespacesRoute.addChildren([namespaceSplatRoute]),
      ]),
      history: createMemoryHistory({
        initialEntries: ["/namespaces/test/some/subtopic"],
      }),
    });

    const wrapper = () => <RouterProvider router={router} />;

    const { result } = renderHook(() => useBreadcrumbs(), { wrapper });

    expect(result.current).toEqual([
      {
        label: "Namespaces",
        to: "/namespaces",
      },
      {
        label: "Namespace",
        to: "/namespaces",
      },
      {
        label: "test",
        to: "/namespaces/test",
      },
      {
        label: "some",
        to: "/namespaces/test/some",
      },
      {
        label: "subtopic",
        to: "/namespaces/test/some/subtopic",
      },
    ]);
  });
});
