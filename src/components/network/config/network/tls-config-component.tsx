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
import {useFormik} from 'formik';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import {TlsConfigDTO} from '@/generated/model'; // Adjust import path as necessary

interface TlsConfigComponentProps {
  config: TlsConfigDTO;
  onChange: (updatedConfig: TlsConfigDTO) => void;
}

const TlsConfigComponent: React.FC<TlsConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || 'ssl',
      backlog: config.backlog || 100,
      enableReadDelayOnFragmentation: config.enableReadDelayOnFragmentation || false,
      fragmentationLimit: config.fragmentationLimit || 0,
      readDelayOnFragmentation: config.readDelayOnFragmentation || 0,
      receiveBufferSize: config.receiveBufferSize || 10240,
      sendBufferSize: config.sendBufferSize || 10240,
      soLingerDelaySec: config.soLingerDelaySec || 0,
      timeout: config.timeout || 30000,
      // SSL configuration fields
      clientCertificateRequired: config.sslConfig?.clientCertificateRequired || false,
      clientCertificateWanted: config.sslConfig?.clientCertificateWanted || false,
      context: config.sslConfig?.context || '',
      crlInterval: config.sslConfig?.crlInterval || 0,
      crlUrl: config.sslConfig?.crlUrl || '',
      keyStore: config.sslConfig?.keyStore || {},  // Placeholder for KeyStoreConfig
      trustStore: config.sslConfig?.trustStore || {}, // Placeholder for KeyStoreConfig
    },
    validationSchema: Yup.object({
      backlog: Yup.number().min(0, 'Must be at least 0').required('Required'),
      fragmentationLimit: Yup.number().min(0, 'Must be at least 0').required('Required'),
      readDelayOnFragmentation: Yup.number().min(0, 'Must be at least 0').required('Required'),
      receiveBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      sendBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      soLingerDelaySec: Yup.number().min(0, 'Must be at least 0').required('Required'),
      timeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      crlInterval: Yup.number().min(0, 'Must be at least 0').required('Required'),
      crlUrl: Yup.string().url('Must be a valid URL'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        {/* Existing TlsConfig fields... */}
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

        {/* SSL Configuration Fields */}
        <Typography variant="h6" sx={{ mt: 3 }}>SSL Configuration</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.clientCertificateRequired}
              onChange={(event) => formik.setFieldValue('clientCertificateRequired', event.target.checked)}
            />
          }
          label="Client Certificate Required"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.clientCertificateWanted}
              onChange={(event) => formik.setFieldValue('clientCertificateWanted', event.target.checked)}
            />
          }
          label="Client Certificate Wanted"
        />

        <TextField
          fullWidth
          label="Context"
          margin="normal"
          name="context"
          value={formik.values.context}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.context && formik.errors.context)}
          helperText={formik.touched.context && formik.errors.context}
        />

        <TextField
          fullWidth
          label="CRL Interval (ms)"
          margin="normal"
          name="crlInterval"
          type="number"
          value={formik.values.crlInterval}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.crlInterval && formik.errors.crlInterval)}
          helperText={formik.touched.crlInterval && formik.errors.crlInterval}
        />

        <TextField
          fullWidth
          label="CRL URL"
          margin="normal"
          name="crlUrl"
          value={formik.values.crlUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.crlUrl && formik.errors.crlUrl)}
          helperText={formik.touched.crlUrl && formik.errors.crlUrl}
        />

        {/* Placeholder for KeyStore and TrustStore configurations */}
        <Box mt={2}>
          <Typography variant="h6">KeyStore Configuration</Typography>
          <TextField
            fullWidth
            label="KeyStore Path"
            margin="normal"
            name="keyStore.path" // Adjust field names as needed
            value={formik.values.keyStore.path || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            label="KeyStore Password"
            margin="normal"
            name="keyStore.password"
            type="password"
            value={formik.values.keyStore.passphrase || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="h6">TrustStore Configuration</Typography>
          <TextField
            fullWidth
            label="TrustStore Path"
            margin="normal"
            name="trustStore.path"
            value={formik.values.trustStore.path || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            label="TrustStore Password"
            margin="normal"
            name="trustStore.password"
            type="password"
            value={formik.values.trustStore.passphrase || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TlsConfigComponent;
