import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/logging")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/logging"!</div>;
}
