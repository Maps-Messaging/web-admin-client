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
import {Box, Button, Checkbox, FormControlLabel, TextField,} from '@mui/material';
import {AmqpConfigDTO} from '@/generated/model'; // Adjust import path as necessary

interface AmqpConfigComponentProps {
  config: AmqpConfigDTO;
  onChange: (updatedConfig: AmqpConfigDTO) => void;
}

const AmqpConfigComponent: React.FC<AmqpConfigComponentProps> = ({ config, onChange }) => {
  // Define initial values and validation schema
  const formik = useFormik({
    initialValues: {
      type: config.type || 'amqp',
      remoteAuthConfig: config.remoteAuthConfig,
      durable: config.durable || false,
      idleTimeout: config.idleTimeout || 30000,
      incomingCapacity: config.incomingCapacity || 65536,
      linkCredit: config.linkCredit || 50,
      maxFrameSize: config.maxFrameSize || 65536,
      outgoingWindow: config.outgoingWindow || 100,
    },
    validationSchema: Yup.object({
      durable: Yup.boolean(),
      idleTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      incomingCapacity: Yup.number().min(0, 'Must be at least 0').required('Required'),
      linkCredit: Yup.number().min(0, 'Must be at least 0').required('Required'),
      maxFrameSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      outgoingWindow: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        {/* Render ProtocolConfig Fields */}

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.durable}
              onChange={(event) => formik.setFieldValue('durable', event.target.checked)}
            />
          }
          label="Durable"
        />

        <TextField
          fullWidth
          label="Idle Timeout (ms)"
          margin="normal"
          name="idleTimeout"
          type="number"
          value={formik.values.idleTimeout}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.idleTimeout && formik.errors.idleTimeout)}
          helperText={formik.touched.idleTimeout && formik.errors.idleTimeout}
        />

        <TextField
          fullWidth
          label="Incoming Capacity"
          margin="normal"
          name="incomingCapacity"
          type="number"
          value={formik.values.incomingCapacity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.incomingCapacity && formik.errors.incomingCapacity)}
          helperText={formik.touched.incomingCapacity && formik.errors.incomingCapacity}
        />

        <TextField
          fullWidth
          label="Link Credit"
          margin="normal"
          name="linkCredit"
          type="number"
          value={formik.values.linkCredit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.linkCredit && formik.errors.linkCredit)}
          helperText={formik.touched.linkCredit && formik.errors.linkCredit}
        />

        <TextField
          fullWidth
          label="Max Frame Size (bytes)"
          margin="normal"
          name="maxFrameSize"
          type="number"
          value={formik.values.maxFrameSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.maxFrameSize && formik.errors.maxFrameSize)}
          helperText={formik.touched.maxFrameSize && formik.errors.maxFrameSize}
        />

        <TextField
          fullWidth
          label="Outgoing Window"
          margin="normal"
          name="outgoingWindow"
          type="number"
          value={formik.values.outgoingWindow}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.outgoingWindow && formik.errors.outgoingWindow)}
          helperText={formik.touched.outgoingWindow && formik.errors.outgoingWindow}
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

export default AmqpConfigComponent;
