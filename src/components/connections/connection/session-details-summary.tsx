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

import React from 'react';
import {Card, CardContent, Grid, Typography} from '@mui/material';
import {SessionContextDTO} from '@/generated/model';
import {formatUptime} from "@/helper-functions";

interface SessionDetailsSummaryProps {
  sessionContext: SessionContextDTO;
}

const SessionDetailsSummary: React.FC<SessionDetailsSummaryProps> = ({ sessionContext }) => {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Session Details
        </Typography>
        <Grid container spacing={2}>
          {/* ID */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>ID:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.id || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Unique ID */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Unique ID:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.uniqueId || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Authorized */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Authorized:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.authorized ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Expiry */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Expiry:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{ formatUptime( (sessionContext.expiry ?? 0) * 1000) }</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Has Will */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Has Will:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.hasWill ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Persistent Session */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Persistent Session:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.persistentSession ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Receive Maximum */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Receive Maximum:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.receiveMaximum ?? 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Reset State */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Reset State:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.resetState ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Restored */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Restored:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{sessionContext.restored ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SessionDetailsSummary;
