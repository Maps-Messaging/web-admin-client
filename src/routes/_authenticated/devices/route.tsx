import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/devices")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/devices"!</div>;
}
