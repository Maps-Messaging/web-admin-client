import React, { useState } from 'react';
import {Pause, Play, Record, Stop} from "@phosphor-icons/react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type ActionControllerProps = {
  currentState: String;
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRecord?: (isRecording: boolean) => void;
};

const ActionController: React.FC<ActionControllerProps> = ({
                                                             currentState,
                                                             onStart,
                                                             onStop,
                                                             onPause,
                                                             onResume,
                                                             onRecord
                                                           }) => {
  const [state, setState] = useState<String>(currentState);
  const [recording, setRecording] = useState(false);

  const handleStart = () => {
    setState('Started');
    onStart?.();
  };

  const handleStop = () => {
    setState('Stopped');
    setRecording(false);
    onStop?.();
  };

  const handlePause = () => {
    setState('Paused');
    onPause?.();
  };

  const handleResume = () => {
    setState('Started');
    onResume?.();
  };

  const handleRecord = () => {
    const newRecordingState = !recording;
    setRecording(newRecordingState);
    onRecord?.(newRecordingState);
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {(state === 'Started' || state === 'Paused') && (
        <IconButton onClick={handleStop} color="secondary">
          <Tooltip title="Stop">
            <Stop/>
          </Tooltip>
        </IconButton>
      )}
      {state === 'Stopped' && (
        <IconButton onClick={handleStart} color="primary">
          <Tooltip title="Start">
            <Play/>
          </Tooltip>
        </IconButton>
      )}
      {state === 'Paused' && (
        <IconButton onClick={handleStart} color="primary">
          <Tooltip title="Resume">
            <Play/>
          </Tooltip>
        </IconButton>
      )}
      {state === 'Started' && (
        <IconButton onClick={handlePause} color="primary">
          <Tooltip title="Pause">
            <Pause/>
          </Tooltip>
        </IconButton>
      )}
      {/* Placeholder for alignment */}
      {state === 'Stopped' && (
        <div style={{width: 40}}></div>
      )}
      <IconButton onClick={handleRecord} disabled={state === 'Stopped'} color={recording ? 'error' : 'default'}>
        <Tooltip title={recording ? "Stop Recording" : "Start Recording"}>
          <Record/>
        </Tooltip>
      </IconButton>
    </div>
  )
};

export default ActionController;
