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
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import type {Components} from '@mui/material/styles';

import type {Theme} from '../types';
import {MuiAvatar} from './avatar';
import {MuiButton} from './button';
import {MuiCard} from './card';
import {MuiCardContent} from './card-content';
import {MuiCardHeader} from './card-header';
import {MuiLink} from './link';
import {MuiStack} from './stack';
import {MuiTab} from './tab';
import {MuiTableBody} from './table-body';
import {MuiTableCell} from './table-cell';
import {MuiTableHead} from './table-head';

export const components = {
  MuiAvatar,
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiCardHeader,
  MuiLink,
  MuiStack,
  MuiTab,
  MuiTableBody,
  MuiTableCell,
  MuiTableHead,
} satisfies Components<Theme>;
