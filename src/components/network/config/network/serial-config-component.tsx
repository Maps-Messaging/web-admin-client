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
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import {SerialConfigDTO, SerialConfigDTOAllOfFlowControl} from '@/generated/model';

interface SerialConfigComponentProps {
  config: SerialConfigDTO;
  onChange: (updatedConfig: SerialConfigDTO) => void;
}

const SerialConfigComponent: React.FC<SerialConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || 'serial',
      port: config.port || '',
      baudRate: config.baudRate || 9600,
      dataBits: config.dataBits || 8,
      stopBits: config.stopBits || '1',
      parity: config.parity || 'n',
      flowControl: config.flowControl ?? SerialConfigDTOAllOfFlowControl.NUMBER_0,
      readTimeOut: config.readTimeOut || 1000,
      writeTimeOut: config.writeTimeOut || 1000,
      bufferSize: config.bufferSize || 1024,
    },
    validationSchema: Yup.object({
      port: Yup.string().required('Port is required'),
      baudRate: Yup.number().min(0, 'Baud rate must be positive').required('Required'),
      dataBits: Yup.number().min(5).max(8).required('Required'),
      stopBits: Yup.mixed().oneOf(['1', '1.5', '2'], 'Invalid stop bit value').required('Required'),
      parity: Yup.mixed().oneOf(['o', 'e', 'm', 's', 'n'], 'Invalid parity option').required('Required'),
      flowControl: Yup.number().oneOf(Object.values(SerialConfigDTOAllOfFlowControl), 'Invalid flow control').required('Required'),
      readTimeOut: Yup.number().min(0).required('Required'),
      writeTimeOut: Yup.number().min(0).required('Required'),
      bufferSize: Yup.number().min(0).required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">Serial Port Configuration</Typography>

        <TextField
          fullWidth
          label="Port"
          margin="normal"
          name="port"
          value={formik.values.port}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.port && formik.errors.port)}
          helperText={formik.touched.port && formik.errors.port}
        />

        <TextField
          fullWidth
          label="Baud Rate"
          margin="normal"
          name="baudRate"
          type="number"
          value={formik.values.baudRate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.baudRate && formik.errors.baudRate)}
          helperText={formik.touched.baudRate && formik.errors.baudRate}
        />

        <TextField
          fullWidth
          label="Data Bits"
          margin="normal"
          name="dataBits"
          type="number"
          value={formik.values.dataBits}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.dataBits && formik.errors.dataBits)}
          helperText={formik.touched.dataBits && formik.errors.dataBits}
        />

        <TextField
          fullWidth
          select
          label="Stop Bits"
          margin="normal"
          name="stopBits"
          value={formik.values.stopBits}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.stopBits && formik.errors.stopBits)}
          helperText={formik.touched.stopBits && formik.errors.stopBits}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="1.5">1.5</MenuItem>
          <MenuItem value="2">2</MenuItem>
        </TextField>

        <TextField
          fullWidth
          select
          label="Parity"
          margin="normal"
          name="parity"
          value={formik.values.parity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.parity && formik.errors.parity)}
          helperText={formik.touched.parity && formik.errors.parity}
        >
          <MenuItem value="o">Odd</MenuItem>
          <MenuItem value="e">Even</MenuItem>
          <MenuItem value="m">Mark</MenuItem>
          <MenuItem value="s">Space</MenuItem>
          <MenuItem value="n">None</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Flow Control"
          margin="normal"
          name="flowControl"
          value={formik.values.flowControl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.flowControl && formik.errors.flowControl)}
          helperText={formik.touched.flowControl && formik.errors.flowControl}
        >
          <MenuItem value={SerialConfigDTOAllOfFlowControl.NUMBER_0}>None</MenuItem>
          <MenuItem value={SerialConfigDTOAllOfFlowControl.NUMBER_1}>Hardware In</MenuItem>
          <MenuItem value={SerialConfigDTOAllOfFlowControl.NUMBER_2}>Hardware Out</MenuItem>
          <MenuItem value={SerialConfigDTOAllOfFlowControl.NUMBER_3}>Xon Xoff</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Read Timeout (ms)"
          margin="normal"
          name="readTimeOut"
          type="number"
          value={formik.values.readTimeOut}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.readTimeOut && formik.errors.readTimeOut)}
          helperText={formik.touched.readTimeOut && formik.errors.readTimeOut}
        />

        <TextField
          fullWidth
          label="Write Timeout (ms)"
          margin="normal"
          name="writeTimeOut"
          type="number"
          value={formik.values.writeTimeOut}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.writeTimeOut && formik.errors.writeTimeOut)}
          helperText={formik.touched.writeTimeOut && formik.errors.writeTimeOut}
        />

        <TextField
          fullWidth
          label="Buffer Size (bytes)"
          margin="normal"
          name="bufferSize"
          type="number"
          value={formik.values.bufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.bufferSize && formik.errors.bufferSize)}
          helperText={formik.touched.bufferSize && formik.errors.bufferSize}
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

export default SerialConfigComponent;
