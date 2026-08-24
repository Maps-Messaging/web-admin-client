import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/interfaces")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/interfaces"!</div>;
}
