import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { DtlsConfig } from '@/generated/model'; // Adjust the import path as necessary

interface DtlsConfigComponentProps {
  config: DtlsConfig;
  onChange: (updatedConfig: DtlsConfig) => void;
}

const DtlsConfigComponent: React.FC<DtlsConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || 'dtls',
      // UDP-specific fields for DTLS
      packetReuseTimeout: config.packetReuseTimeout || 0,
      idleSessionTimeout: config.idleSessionTimeout || 0,
      hmacConfigList: config.hmacConfigList || [],
      hmacHostLookupCacheExpiry: config.hmacHostLookupCacheExpiry || 0,
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
      packetReuseTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      idleSessionTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      hmacHostLookupCacheExpiry: Yup.number().min(0, 'Must be at least 0').required('Required'),
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

        {/* UDP-Specific Fields */}
        <Typography variant="h6">UDP-Specific Configuration</Typography>

        <TextField
          fullWidth
          label="Packet Reuse Timeout (ms)"
          margin="normal"
          name="packetReuseTimeout"
          type="number"
          value={formik.values.packetReuseTimeout}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.packetReuseTimeout && formik.errors.packetReuseTimeout)}
          helperText={formik.touched.packetReuseTimeout && formik.errors.packetReuseTimeout}
        />

        <TextField
          fullWidth
          label="Idle Session Timeout (ms)"
          margin="normal"
          name="idleSessionTimeout"
          type="number"
          value={formik.values.idleSessionTimeout}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.idleSessionTimeout && formik.errors.idleSessionTimeout)}
          helperText={formik.touched.idleSessionTimeout && formik.errors.idleSessionTimeout}
        />

        <TextField
          fullWidth
          label="HMAC Host Lookup Cache Expiry (ms)"
          margin="normal"
          name="hmacHostLookupCacheExpiry"
          type="number"
          value={formik.values.hmacHostLookupCacheExpiry}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.hmacHostLookupCacheExpiry && formik.errors.hmacHostLookupCacheExpiry)}
          helperText={formik.touched.hmacHostLookupCacheExpiry && formik.errors.hmacHostLookupCacheExpiry}
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

        {/* KeyStore and TrustStore Configuration */}
        <Box mt={2}>
          <Typography variant="h6">KeyStore Configuration</Typography>
          <TextField
            fullWidth
            label="KeyStore Path"
            margin="normal"
            name="keyStore.path"
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

export default DtlsConfigComponent;
