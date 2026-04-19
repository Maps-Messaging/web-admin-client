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
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid} from '@mui/material';
import {formatNumberWithPowerUnit, formatUptime, numberToDateString} from '@/helper-functions';
import {EndPointDetailsDTO} from '@/generated/model';

interface ConnectionInfoDetailProps {
  connectionData: EndPointDetailsDTO;
}

export function ConnectionInfoDetail({ connectionData = {} }: ConnectionInfoDetailProps): React.JSX.Element {
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Connection Details
        </Typography>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Name:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{connectionData?.endPointSummary?.name || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Adapter */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Adapter:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{connectionData?.endPointSummary?.adapter || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* User */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>User:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{connectionData?.endPointSummary?.user || 'Anonymous'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Protocol */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Protocol:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {connectionData?.endPointSummary?.protocolName || 'N/A'}{' '}
                  {connectionData?.endPointSummary?.protocolVersion || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Time Connected */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Time Connected:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {formatUptime(connectionData?.endPointSummary?.connectedTimeMs || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Bytes Received */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Bytes Received:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {formatNumberWithPowerUnit(connectionData?.endPointSummary?.totalBytesRead || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Last Read */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Last Read:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {numberToDateString(connectionData?.endPointSummary?.lastRead || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Bytes Written */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Bytes Written:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {formatNumberWithPowerUnit(connectionData?.endPointSummary?.totalBytesWritten || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Last Write */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Last Write:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {numberToDateString(connectionData?.endPointSummary?.lastWrite || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConnectionInfoDetail;
