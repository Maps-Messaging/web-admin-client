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

import React from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Box, Button, Checkbox, FormControlLabel, TextField} from '@mui/material';
import {TcpConfigDTO} from '@/generated/model'; // Adjust the import path as necessary

interface TcpConfigComponentProps {
  config: TcpConfigDTO;
  onChange: (updatedConfig: TcpConfigDTO) => void;
}

const TcpConfigComponent: React.FC<TcpConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || 'tcp',
      backlog: config.backlog || 100,
      enableReadDelayOnFragmentation: config.enableReadDelayOnFragmentation || false,
      fragmentationLimit: config.fragmentationLimit || 0,
      readDelayOnFragmentation: config.readDelayOnFragmentation || 0,
      receiveBufferSize: config.receiveBufferSize || 10240,
      sendBufferSize: config.sendBufferSize || 10240,
      soLingerDelaySec: config.soLingerDelaySec || 0,
      timeout: config.timeout || 30000,
    },
    validationSchema: Yup.object({
      backlog: Yup.number().min(0, 'Must be at least 0').required('Required'),
      fragmentationLimit: Yup.number().min(0, 'Must be at least 0').required('Required'),
      readDelayOnFragmentation: Yup.number().min(0, 'Must be at least 0').required('Required'),
      receiveBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      sendBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      soLingerDelaySec: Yup.number().min(0, 'Must be at least 0').required('Required'),
      timeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>

        <TextField
          fullWidth
          label="Backlog"
          margin="normal"
          name="backlog"
          type="number"
          value={formik.values.backlog}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.backlog && formik.errors.backlog)}
          helperText={formik.touched.backlog && formik.errors.backlog}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.enableReadDelayOnFragmentation}
              onChange={(event) => formik.setFieldValue('enableReadDelayOnFragmentation', event.target.checked)}
            />
          }
          label="Enable Read Delay on Fragmentation"
        />

        <TextField
          fullWidth
          label="Fragmentation Limit"
          margin="normal"
          name="fragmentationLimit"
          type="number"
          value={formik.values.fragmentationLimit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.fragmentationLimit && formik.errors.fragmentationLimit)}
          helperText={formik.touched.fragmentationLimit && formik.errors.fragmentationLimit}
        />

        <TextField
          fullWidth
          label="Read Delay on Fragmentation (ms)"
          margin="normal"
          name="readDelayOnFragmentation"
          type="number"
          value={formik.values.readDelayOnFragmentation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.readDelayOnFragmentation && formik.errors.readDelayOnFragmentation)}
          helperText={formik.touched.readDelayOnFragmentation && formik.errors.readDelayOnFragmentation}
        />

        <TextField
          fullWidth
          label="Receive Buffer Size (bytes)"
          margin="normal"
          name="receiveBufferSize"
          type="number"
          value={formik.values.receiveBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.receiveBufferSize && formik.errors.receiveBufferSize)}
          helperText={formik.touched.receiveBufferSize && formik.errors.receiveBufferSize}
        />

        <TextField
          fullWidth
          label="Send Buffer Size (bytes)"
          margin="normal"
          name="sendBufferSize"
          type="number"
          value={formik.values.sendBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.sendBufferSize && formik.errors.sendBufferSize)}
          helperText={formik.touched.sendBufferSize && formik.errors.sendBufferSize}
        />

        <TextField
          fullWidth
          label="SO Linger Delay (sec)"
          margin="normal"
          name="soLingerDelaySec"
          type="number"
          value={formik.values.soLingerDelaySec}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.soLingerDelaySec && formik.errors.soLingerDelaySec)}
          helperText={formik.touched.soLingerDelaySec && formik.errors.soLingerDelaySec}
        />

        <TextField
          fullWidth
          label="Timeout (ms)"
          margin="normal"
          name="timeout"
          type="number"
          value={formik.values.timeout}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.timeout && formik.errors.timeout)}
          helperText={formik.touched.timeout && formik.errors.timeout}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TcpConfigComponent;
