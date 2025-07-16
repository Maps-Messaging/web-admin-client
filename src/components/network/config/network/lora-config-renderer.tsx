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
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import {LoRaSerialConfigDTO} from '@/generated/model'; // Adjust the import path as necessary

interface LoRaConfigComponentProps {
  config: LoRaSerialConfigDTO;
  onChange: (updatedConfig: LoRaSerialConfigDTO) => void;
}

const LoRaConfigComponent: React.FC<LoRaConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || "loraSerial",
      discoverable: config.discoverable || false,
      selectorThreadCount: config.selectorThreadCount || 1,
      serverReadBufferSize: config.serverReadBufferSize || 10240,
      serverWriteBufferSize: config.serverWriteBufferSize || 10240,
    },
    validationSchema: Yup.object({
      selectorThreadCount: Yup.number().min(1, 'Must be at least 1').required('Required'),
      serverReadBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      serverWriteBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">LoRa Configuration</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.discoverable}
              onChange={(event) => formik.setFieldValue('discoverable', event.target.checked)}
            />
          }
          label="Discoverable"
        />

        <TextField
          fullWidth
          label="Selector Thread Count"
          margin="normal"
          name="selectorThreadCount"
          type="number"
          value={formik.values.selectorThreadCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.selectorThreadCount && formik.errors.selectorThreadCount)}
          helperText={formik.touched.selectorThreadCount && formik.errors.selectorThreadCount}
        />

        <TextField
          fullWidth
          label="Server Read Buffer Size (bytes)"
          margin="normal"
          name="serverReadBufferSize"
          type="number"
          value={formik.values.serverReadBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverReadBufferSize && formik.errors.serverReadBufferSize)}
          helperText={formik.touched.serverReadBufferSize && formik.errors.serverReadBufferSize}
        />

        <TextField
          fullWidth
          label="Server Write Buffer Size (bytes)"
          margin="normal"
          name="serverWriteBufferSize"
          type="number"
          value={formik.values.serverWriteBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverWriteBufferSize && formik.errors.serverWriteBufferSize)}
          helperText={formik.touched.serverWriteBufferSize && formik.errors.serverWriteBufferSize}
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

export default LoRaConfigComponent;
