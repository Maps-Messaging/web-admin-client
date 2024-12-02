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
'use client'

import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Box, Button, Checkbox, FormControlLabel, TextField,} from '@mui/material';
import {updateServerConfig} from "@/generated/server-config-management/server-config-management";
import {MessageDaemonConfigDTO} from "@/generated/model";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


interface MessagingServerConfigProps {
  config: MessageDaemonConfigDTO;
}

export function  MessagingServerConfig({config}: MessagingServerConfigProps): React.JSX.Element {

  const initialConfig = config;

  const formik = useFormik({
    initialValues: initialConfig,
    validationSchema: Yup.object({
      delayedPublishInterval: Yup.number().min(10, 'Must be at least 10').required('Required'),
      sessionPipeLines: Yup.number().min(1, 'Must be at least 1').required('Required'),
      transactionExpiry: Yup.number().min(0, 'Must be at least 0').required('Required'),
      transactionScan: Yup.number().min(0, 'Must be at least 0').required('Required'),
      compressionName: Yup.string()
        .oneOf(['inflator', 'none'], 'Invalid compression name')
        .required('Required'),
      compressMessageMinSize: Yup.number().min(512, 'Must be at least 512').required('Required'),
      latitude: Yup.number().min(-90).max(90).required('Required'),
      longitude: Yup.number().min(-180).max(180).required('Required'),
    }),
    onSubmit: async (values) => {
      await updateServerConfig(values); // Await the promise
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="compressionName-label">Compression Algorithm Name</InputLabel>
          <Select
            labelId="compressionName-label"
            id="compressionName"
            name="compressionName"
            value={formik.values.compressionName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.compressionName && formik.errors.compressionName)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="inflator">Inflator</MenuItem>
          </Select>
          {formik.touched.compressionName && formik.errors.compressionName && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
              {formik.errors.compressionName}
            </Box>
          )}
        </FormControl>


        {[
          { name: 'delayedPublishInterval', label: 'Delayed Publish Interval (ms)' },
          { name: 'sessionPipeLines', label: 'Session Pipelines' },
          { name: 'transactionExpiry', label: 'Transaction Expiry (ms)' },
          { name: 'transactionScan', label: 'Transaction Scan Interval (ms)' },
          { name: 'compressMessageMinSize', label: 'Compress Message Min Size (bytes)' },
          { name: 'latitude', label: 'Latitude' },
          { name: 'longitude', label: 'Longitude' },
        ].map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            margin="normal"
            name={field.name}
            type={['latitude', 'longitude'].includes(field.name) ? 'number' : 'text'}
            value={formik.values[field.name as keyof MessageDaemonConfigDTO]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched[field.name as keyof MessageDaemonConfigDTO] &&
              formik.errors[field.name as keyof MessageDaemonConfigDTO]
            )}
            helperText={
              formik.touched[field.name as keyof MessageDaemonConfigDTO] &&
              formik.errors[field.name as keyof MessageDaemonConfigDTO]
            }
          />
        ))}

        {[
          { name: 'enableResourceStatistics', label: 'Enable Resource Statistics' },
          { name: 'enableSystemTopics', label: 'Enable System Topics' },
          { name: 'enableSystemStatusTopics', label: 'Enable System Status Topics' },
          { name: 'enableSystemTopicAverages', label: 'Enable System Topic Averages' },
          { name: 'enableJMX', label: 'Enable JMX Monitoring' },
          { name: 'enableJMXStatistics', label: 'Enable JMX Statistics' },
          { name: 'tagMetaData', label: 'Tag Metadata for Messages' },
        ].map((field) => (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                name={field.name}
                checked={formik.values[field.name as keyof MessageDaemonConfigDTO] as boolean}
                onChange={formik.handleChange}
              />
            }
            label={field.label}
          />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default MessagingServerConfig;
