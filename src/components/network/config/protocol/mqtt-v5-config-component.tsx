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
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import {MqttV5ConfigDTO} from "@/generated/model";

interface MqttV5ConfigComponentProps {
  config: MqttV5ConfigDTO;
  onChange: (updatedConfig: MqttV5ConfigDTO) => void;
}

const MqttV5ConfigComponent: React.FC<MqttV5ConfigComponentProps> = ({ config, onChange }) => {
  // Define initial values and validation schema using Yup
  const formik = useFormik({
    initialValues: {
      type: config.type || 'mqtt-v5',
      maximumSessionExpiry: config.maximumSessionExpiry || 86400,
      maximumBufferSize: config.maximumBufferSize || 10485760,
      serverReceiveMaximum: config.serverReceiveMaximum || 10,
      clientReceiveMaximum: config.clientReceiveMaximum || 65535,
      clientMaximumTopicAlias: config.clientMaximumTopicAlias || 32767,
      serverMaximumTopicAlias: config.serverMaximumTopicAlias || 0,
      strictClientId: config.strictClientId || false,
      minServerKeepAlive: config.minServerKeepAlive || 0,
      maxServerKeepAlive: config.maxServerKeepAlive || 60,
    },
    validationSchema: Yup.object({
      maximumSessionExpiry: Yup.number().min(0, 'Must be at least 0').required('Required'),
      maximumBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      serverReceiveMaximum: Yup.number().min(0, 'Must be at least 0').required('Required'),
      clientReceiveMaximum: Yup.number().min(0, 'Must be at least 0').required('Required'),
      clientMaximumTopicAlias: Yup.number().min(0, 'Must be at least 0').required('Required'),
      serverMaximumTopicAlias: Yup.number().min(0, 'Must be at least 0').required('Required'),
      minServerKeepAlive: Yup.number().min(0, 'Must be at least 0').required('Required'),
      maxServerKeepAlive: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values); // Pass updated config back to parent component
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        {/* MQTT Config Fields */}
        <TextField
          fullWidth
          label="Maximum Session Expiry (seconds)"
          margin="normal"
          name="maximumSessionExpiry"
          type="number"
          value={formik.values.maximumSessionExpiry}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maximumSessionExpiry && formik.errors.maximumSessionExpiry)}
          helperText={formik.touched.maximumSessionExpiry && formik.errors.maximumSessionExpiry}
        />

        <TextField
          fullWidth
          label="Maximum Buffer Size (bytes)"
          margin="normal"
          name="maximumBufferSize"
          type="number"
          value={formik.values.maximumBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maximumBufferSize && formik.errors.maximumBufferSize)}
          helperText={formik.touched.maximumBufferSize && formik.errors.maximumBufferSize}
        />

        <TextField
          fullWidth
          label="Server Receive Maximum"
          margin="normal"
          name="serverReceiveMaximum"
          type="number"
          value={formik.values.serverReceiveMaximum}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverReceiveMaximum && formik.errors.serverReceiveMaximum)}
          helperText={formik.touched.serverReceiveMaximum && formik.errors.serverReceiveMaximum}
        />

        <TextField
          fullWidth
          label="Client Receive Maximum"
          margin="normal"
          name="clientReceiveMaximum"
          type="number"
          value={formik.values.clientReceiveMaximum}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.clientReceiveMaximum && formik.errors.clientReceiveMaximum)}
          helperText={formik.touched.clientReceiveMaximum && formik.errors.clientReceiveMaximum}
        />

        <TextField
          fullWidth
          label="Client Maximum Topic Alias"
          margin="normal"
          name="clientMaximumTopicAlias"
          type="number"
          value={formik.values.clientMaximumTopicAlias}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.clientMaximumTopicAlias && formik.errors.clientMaximumTopicAlias)}
          helperText={formik.touched.clientMaximumTopicAlias && formik.errors.clientMaximumTopicAlias}
        />

        <TextField
          fullWidth
          label="Server Maximum Topic Alias"
          margin="normal"
          name="serverMaximumTopicAlias"
          type="number"
          value={formik.values.serverMaximumTopicAlias}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverMaximumTopicAlias && formik.errors.serverMaximumTopicAlias)}
          helperText={formik.touched.serverMaximumTopicAlias && formik.errors.serverMaximumTopicAlias}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.strictClientId}
              name="strictClientId"
              onChange={formik.handleChange}
            />
          }
          label="Strict Client ID"
        />

        {/* MQTT V5 Additional Fields */}
        <TextField
          fullWidth
          label="Minimum Server Keep Alive (seconds)"
          margin="normal"
          name="minServerKeepAlive"
          type="number"
          value={formik.values.minServerKeepAlive}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.minServerKeepAlive && formik.errors.minServerKeepAlive)}
          helperText={formik.touched.minServerKeepAlive && formik.errors.minServerKeepAlive}
        />

        <TextField
          fullWidth
          label="Maximum Server Keep Alive (seconds)"
          margin="normal"
          name="maxServerKeepAlive"
          type="number"
          value={formik.values.maxServerKeepAlive}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maxServerKeepAlive && formik.errors.maxServerKeepAlive)}
          helperText={formik.touched.maxServerKeepAlive && formik.errors.maxServerKeepAlive}
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

export default MqttV5ConfigComponent;
