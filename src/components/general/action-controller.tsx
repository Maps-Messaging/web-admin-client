/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {useState} from 'react';
import {Pause, Play, Stop} from "@phosphor-icons/react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface ActionControllerProps {
  currentState: string;
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

const ActionController: React.FC<ActionControllerProps> = ({
                                                             currentState,
                                                             onStart,
                                                             onStop,
                                                             onPause,
                                                             onResume
                                                           }) => {
  const [state, setState] = useState<string>(currentState);

  const handleStart = () => {
    setState('Started');
    onStart?.();
  };

  const handleStop = () => {
    setState('Stopped');
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
        <IconButton onClick={handleResume} color="primary">
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
    </div>
  )
};

export default ActionController;
