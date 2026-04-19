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

'use client';

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
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {DestinationDTO} from "@/generated/model";

interface DestinationDetailHeaderProps {
  destinationData?: DestinationDTO;
  displayName?: boolean;
}

export function DestinationDetailHeader({ destinationData, displayName=true }: DestinationDetailHeaderProps): React.JSX.Element {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {/* First Column */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            General Details
          </Typography>
          <Grid container spacing={2}>
            {/* Name */}
            {displayName &&
              <div>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Name:</strong>
                </Typography>
              </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{destinationData?.name || 'N/A'}</Typography>
                </Grid>
              </div>
            }
            {/* Type */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Type:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.type || 'N/A'}</Typography>
            </Grid>

            {/* Stored Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Stored Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.storedMessages}</Typography>
            </Grid>

            {/* Delayed Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Delayed Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.delayedMessages}</Typography>
            </Grid>

            {/* Pending Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Pending Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.pendingMessages}</Typography>
            </Grid>

            {/* Schema ID */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Schema ID:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.schemaId || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </CardContent>


        {/* Second Column */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Performance Metrics
          </Typography>
          <Grid container spacing={2}>
            {/* No Interest Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>No Interest Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.noInterestMessages}</Typography>
            </Grid>

            {/* Published Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Published Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.publishedMessages}</Typography>
            </Grid>

            {/* Retrieved Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Retrieved Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.retrievedMessages}</Typography>
            </Grid>

            {/* Expired Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Expired Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.expiredMessages}</Typography>
            </Grid>

            {/* Delivered Messages */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Delivered Messages:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.deliveredMessages}</Typography>
            </Grid>

            {/* Average Write Time */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Average Write Time:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.writeTimeAveNs} ns</Typography>
            </Grid>

            {/* Average Delete Time */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Average Delete Time:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{destinationData?.deleteTimeAveNs} ns</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
}

export default DestinationDetailHeader;
