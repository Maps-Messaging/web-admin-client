/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

'use client';

import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export interface NoSsrProps {
  children?: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

// https://github.com/mui/material-ui/blob/master/packages/mui-base/src/NoSsr/NoSsr.tsx
// without prop-types
export function NoSsr(props: NoSsrProps): React.JSX.Element {
  const { children, defer = false, fallback = null } = props;
  const [mountedState, setMountedState] = React.useState(false);

  useEnhancedEffect((): void => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect((): void => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <React.Fragment>{mountedState ? children : fallback}</React.Fragment>;
}
