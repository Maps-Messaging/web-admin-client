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

import { useConfig } from "@/components/settings/hooks";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";
import Editor, { type Monaco, type OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { type FunctionComponent, useEffect, useRef, useState } from "react";

interface ConfigEditorProps {
  configName: string;
}

export const ConfigEditor: FunctionComponent<ConfigEditorProps> = ({
  configName,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };
  const [isValid, setIsValid] = useState(true);
  const { theme } = useTheme();

  const { data } = useConfig(configName);
  const { config, schema } = data ?? { schema: undefined, config: undefined };

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
    // TODO: Call API when it is created
  };

  const handleEditorWillMount = (monaco: Monaco): void => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: schema?.$schema as string,

          fileMatch: ["*"],
          schema,
        },
      ],
    });
  };

  return (
    <>
      <div className="px-6 flex items-center justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold">
            {data?.schema.title as string /*TODO: update API types*/}
          </h1>
          <div>
            {data?.schema.description as string /*TODO: update API types*/}
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => formatConfig()}>
            Format
          </Button>
          <Button onClick={() => validateAndSave()} disabled={!isValid}>
            Save
          </Button>
        </div>
      </div>
      <Editor
        defaultLanguage="json"
        value={JSON.stringify(config, null, 2)}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        theme={theme === "light" ? "vs" : "vs-dark"}
        options={{
          minimap: { enabled: false },
          formatOnPaste: true,
          formatOnType: true,
          scrollBeyondLastLine: false,
          autoDetectHighContrast: true,
        }}
      />
    </>
  );
};
