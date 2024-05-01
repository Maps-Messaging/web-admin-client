import React from 'react';
import AceEditor from 'react-ace';

// Import the theme and mode for YAML
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

interface YamlEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const YamlEditor: React.FC<YamlEditorProps> = ({ value, onChange }) => {
  return (
    <AceEditor
      mode="yaml"
      theme="github"
      value={value}
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}

export default YamlEditor;
