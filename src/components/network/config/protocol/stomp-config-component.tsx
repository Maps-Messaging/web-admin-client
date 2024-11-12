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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { StompConfig } from '@/generated/model'; // Adjust import to match the path to your generated types

interface StompConfigComponentProps {
  config: StompConfig;
  onChange: (updatedConfig: StompConfig) => void;
}

const StompConfigComponent: React.FC<StompConfigComponentProps> = ({ config, onChange }) => {
  // Define initial values and validation schema
  const formik = useFormik({
    initialValues: {
      type: config.type || 'stomp',
      remoteAuthConfig: config.remoteAuthConfig,
      maxBufferSize: config.maxBufferSize || 10485760,
      maxReceive: config.maxReceive || 65535,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      maxBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      maxReceive: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        {/* ProtocolConfig Fields */}

        {/* STOMP-Specific Fields */}
        <TextField
          fullWidth
          label="Max Buffer Size (bytes)"
          margin="normal"
          name="maxBufferSize"
          type="number"
          value={formik.values.maxBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maxBufferSize && formik.errors.maxBufferSize)}
          helperText={formik.touched.maxBufferSize && formik.errors.maxBufferSize}
        />

        <TextField
          fullWidth
          label="Max Receive (bytes)"
          margin="normal"
          name="maxReceive"
          type="number"
          value={formik.values.maxReceive}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maxReceive && formik.errors.maxReceive)}
          helperText={formik.touched.maxReceive && formik.errors.maxReceive}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default StompConfigComponent;
