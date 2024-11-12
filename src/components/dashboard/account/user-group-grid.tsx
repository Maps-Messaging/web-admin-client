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

import React from 'react';
import { Grid, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {Trash} from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

interface UserGroupGridProps {
  groups: string[];
  onDelete: (groupId: string) => void;
}

const UserGroupGrid: React.FC<UserGroupGridProps> = ({ groups, onDelete }) => {
  return (
    <div>
      <Typography variant="h6">Groups</Typography>

      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={3} key={group}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
                border: '1px solid #ccc',
                borderRadius: 1,
              }}
            >
              <Typography variant="body1">{group}</Typography>
              <Tooltip title="Remove from user">
                <IconButton color="secondary" onClick={() => { onDelete(group); }}>
                  <Trash/>
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>

  );
};

export default UserGroupGrid;
