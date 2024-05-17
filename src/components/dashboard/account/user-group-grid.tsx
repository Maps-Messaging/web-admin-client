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
