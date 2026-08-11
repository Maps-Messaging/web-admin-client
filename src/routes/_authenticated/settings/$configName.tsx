import { ConfigEditor } from "@/components/settings/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/$configName")({
  component: RouteComponent,
  loader: ({ params }) => ({ breadcrumb: params.configName }),
});

function RouteComponent() {
  const { configName } = Route.useParams();

  return (
    <div className="flex flex-col gap-4 w-6xl mx-auto flex-1">
      <ConfigEditor configName={configName} />
    </div>
  );
}
