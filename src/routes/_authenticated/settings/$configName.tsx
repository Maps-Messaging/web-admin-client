import { ConfigEditor } from "@/components/settings/editor";
import { useConfig } from "@/components/settings/hooks";
import { Button } from "@/components/ui/button";
import type { Monaco } from "@monaco-editor/react";
import { createFileRoute } from "@tanstack/react-router";
import type { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_authenticated/settings/$configName")({
  component: RouteComponent,
  loader: ({ params }) => ({ breadcrumb: params.configName }),
});

function RouteComponent() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [isValid, setIsValid] = useState(true);

  const { configName } = Route.useParams();
  const { data } = useConfig(configName);

  const formatConfig = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  };

  useEffect(() => {
    if (!monacoRef.current) return;

    const disposable = monacoRef.current.editor.onDidChangeMarkers(() => {
      const markers: editor.IMarker[] =
        monacoRef.current!.editor.getModelMarkers({});
      const hasErrors = markers.some(
        (marker) => marker.severity === monacoRef.current!.MarkerSeverity.Error,
      );

      setIsValid(!hasErrors);
    });

    return () => disposable.dispose();
  }, [monacoRef.current]);

  const validateAndSave = () => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const monaco = monacoRef.current;

    // 1. Get all markers for the current model
    const markers: editor.IMarker[] = monaco.editor.getModelMarkers({
      resource: model.uri,
    });

    // 2. Filter for actual Errors (Severity 8)
    const errors = markers.filter(
      (marker) => marker.severity === monaco.MarkerSeverity.Error,
    );

    if (errors.length > 0) {
      console.error("Cannot save. JSON has errors:", errors);
      alert(`Please fix ${errors.length} error(s) before saving.`);

      // Optional: Reveal the first error to the user
      if (errors[0]?.startLineNumber)
        editorRef.current.revealLine(errors[0].startLineNumber);
      return;
    }

    const content = editorRef.current.getValue();
    console.log("Saving valid JSON:", JSON.parse(content));
  };

  return (
    <div className="flex flex-col gap-4 w-6xl mx-auto flex-1">
      <div className="px-6 flex items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold">{data?.config?.name}</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => formatConfig()}>
            Format
          </Button>
          <Button onClick={() => validateAndSave()} disabled={!isValid}>
            Save
          </Button>
        </div>
      </div>
      <ConfigEditor
        configName={configName}
        editorRef={editorRef}
        monacoRef={monacoRef}
      />
    </div>
  );
}
