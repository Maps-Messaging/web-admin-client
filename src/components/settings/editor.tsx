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
import { useTheme } from "@/theme/theme-provider";
import Editor, {
  type Monaco,
  type OnChange,
  type OnMount,
} from "@monaco-editor/react";
import type * as monacoEditor from "monaco-editor";
import { type FunctionComponent, type RefObject } from "react";

interface ConfigEditorProps {
  configName: string;
  editorRef: RefObject<monacoEditor.editor.IStandaloneCodeEditor | null>;
  monacoRef: RefObject<Monaco | null>;
}

export const ConfigEditor: FunctionComponent<ConfigEditorProps> = ({
  configName,
  editorRef,
  monacoRef,
}) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const { theme } = useTheme();

  const { data } = useConfig(configName);
  const { config, schema } = data ?? { schema: undefined, config: undefined };

  const handleEditorWillMount = (monaco: Monaco): void => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: `http://internal/${configName}.json`,
          fileMatch: ["*"],
          schema,
        },
      ],
    });
  };

  const handleEditorChange: OnChange = (value) => {
    console.log(value);
  };

  return (
    <Editor
      defaultLanguage="json"
      value={JSON.stringify(config, null, 2)}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onChange={handleEditorChange}
      theme={theme === "light" ? "vs" : "vs-dark"}
      options={{
        minimap: { enabled: false },
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
        autoDetectHighContrast: true,
      }}
    />
  );
};
