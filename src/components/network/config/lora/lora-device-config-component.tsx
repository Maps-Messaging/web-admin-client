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
import {Box, Button, TextField} from '@mui/material';
import {LoRaDeviceConfigInfoDTO} from '@/generated/model'; // Adjust import path as necessary

interface LoRaDeviceConfigComponentProps {
  config: LoRaDeviceConfigInfoDTO;
  onChange: (updatedConfig: LoRaDeviceConfigInfoDTO) => void;
}

const LoRaDeviceConfigComponent: React.FC<LoRaDeviceConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      cadTimeout: config.cadTimeout || 0,
      cs: config.cs || 0,
      frequency: config.frequency || 868000000,  // Example default frequency
      irq: config.irq || 0,
      name: config.name || '',
      power: config.power || 14,  // Default LoRa transmission power
      radio: config.radio || '',
      rst: config.rst || 0,
    },
    validationSchema: Yup.object({
      cadTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      cs: Yup.number().min(0, 'Must be at least 0').required('Required'),
      frequency: Yup.number().min(0, 'Must be at least 0').required('Required'),
      irq: Yup.number().min(0, 'Must be at least 0').required('Required'),
      name: Yup.string().required('Name is required'),
      power: Yup.number().min(0, 'Must be at least 0').required('Required'),
      radio: Yup.string().required('Radio is required'),
      rst: Yup.number().min(0, 'Must be at least 0').required('Required'),
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
          label="Name"
          margin="normal"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          label="CAD Timeout"
          margin="normal"
          name="cadTimeout"
          type="number"
          value={formik.values.cadTimeout}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.cadTimeout && formik.errors.cadTimeout)}
          helperText={formik.touched.cadTimeout && formik.errors.cadTimeout}
        />

        <TextField
          fullWidth
          label="Chip Select (CS) Pin"
          margin="normal"
          name="cs"
          type="number"
          value={formik.values.cs}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.cs && formik.errors.cs)}
          helperText={formik.touched.cs && formik.errors.cs}
        />

        <TextField
          fullWidth
          label="Frequency (Hz)"
          margin="normal"
          name="frequency"
          type="number"
          value={formik.values.frequency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.frequency && formik.errors.frequency)}
          helperText={formik.touched.frequency && formik.errors.frequency}
        />

        <TextField
          fullWidth
          label="IRQ Pin"
          margin="normal"
          name="irq"
          type="number"
          value={formik.values.irq}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.irq && formik.errors.irq)}
          helperText={formik.touched.irq && formik.errors.irq}
        />

        <TextField
          fullWidth
          label="Power (dBm)"
          margin="normal"
          name="power"
          type="number"
          value={formik.values.power}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.power && formik.errors.power)}
          helperText={formik.touched.power && formik.errors.power}
        />

        <TextField
          fullWidth
          label="Radio Module"
          margin="normal"
          name="radio"
          value={formik.values.radio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.radio && formik.errors.radio)}
          helperText={formik.touched.radio && formik.errors.radio}
        />

        <TextField
          fullWidth
          label="Reset (RST) Pin"
          margin="normal"
          name="rst"
          type="number"
          value={formik.values.rst}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.rst && formik.errors.rst)}
          helperText={formik.touched.rst && formik.errors.rst}
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

export default LoRaDeviceConfigComponent;
