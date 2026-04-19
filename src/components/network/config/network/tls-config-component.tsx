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

import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { KeyStoreConfigDTO, TlsConfigDTO } from "@/generated/model";

interface TlsConfigComponentProps {
  config: TlsConfigDTO;
  onChange: (updatedConfig: TlsConfigDTO) => void;
}

type FormValues = Omit<TlsConfigDTO, 'sslConfig'> & {
  sslConfig: NonNullable<TlsConfigDTO['sslConfig']>;
};

function TlsConfigComponent({ config, onChange }: TlsConfigComponentProps): React.JSX.Element {
  const formik = useFormik<FormValues>({
    initialValues: {
      type: config.type ?? ('ssl' as TlsConfigDTO['type']),

      backlog: config.backlog ?? 100,
      enableReadDelayOnFragmentation: config.enableReadDelayOnFragmentation ?? false,
      fragmentationLimit: config.fragmentationLimit ?? 2,
      readDelayOnFragmentation: config.readDelayOnFragmentation ?? 1,
      receiveBufferSize: config.receiveBufferSize ?? 10240,
      sendBufferSize: config.sendBufferSize ?? 10240,
      soLingerDelaySec: config.soLingerDelaySec ?? 0,
      timeout: config.timeout ?? 30000,

      sslConfig: config.sslConfig
        ? {
          clientCertificateRequired: config.sslConfig.clientCertificateRequired ?? false,
          clientCertificateWanted: config.sslConfig.clientCertificateWanted ?? false,
          context: config.sslConfig.context ?? 'TLS',
          crlInterval: config.sslConfig.crlInterval ?? 60000,
          crlUrl: config.sslConfig.crlUrl ?? null,

          // preserve but do not edit
          schemaLoadingVersion: config.sslConfig.schemaLoadingVersion ?? null,

          keyStore: config.sslConfig.keyStore ?? null,
          trustStore: config.sslConfig.trustStore ?? null,
        }
        : {
          clientCertificateRequired: false,
          clientCertificateWanted: false,
          context: 'TLS',
          crlInterval: 60000,
          crlUrl: null,
          schemaLoadingVersion: null,
          keyStore: null,
          trustStore: null,
        },
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      backlog: Yup.number().min(10).max(10000).notRequired(),

      fragmentationLimit: Yup.number().min(2).max(100).notRequired(),

      readDelayOnFragmentation: Yup.number().min(1).max(1000).notRequired(),

      receiveBufferSize: Yup.number().min(1024).max(104857600).notRequired(),

      sendBufferSize: Yup.number().min(1024).max(104857600).notRequired(),

      soLingerDelaySec: Yup.number().min(0).max(60).notRequired(),

      timeout: Yup.number().min(1).max(3600000).notRequired(),

      sslConfig: Yup.object({
        clientCertificateRequired: Yup.boolean().required(),
        clientCertificateWanted: Yup.boolean().required(),

        context: Yup.string()
          .matches(/^TLS(?:v1\.(?:2|3))?$/, 'Must be TLS, TLSv1.2, or TLSv1.3')
          .required('Required'),

        crlInterval: Yup.number().min(60000).max(2419200000).required('Required'),

        crlUrl: Yup.string().nullable().notRequired().url('Must be a valid URL'),

        keyStore: Yup.mixed().nullable().notRequired(),
        trustStore: Yup.mixed().nullable().notRequired(),
      }).required(),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  function getFieldError(path: string): string | undefined {
    const meta = formik.getFieldMeta(path);
    if (!meta.touched || meta.error === null) {
      return undefined;
    }
    return typeof meta.error === 'string' ? meta.error : 'Invalid value';
  }

  function ensureKeyStoreObject(fieldName: 'sslConfig.keyStore' | 'sslConfig.trustStore'): void {
    const sslConfig = formik.values.sslConfig;

    const currentValue = fieldName === 'sslConfig.keyStore' ? sslConfig.keyStore : sslConfig.trustStore;
    if (currentValue) {
      return;
    }

    const defaultKeyStore: NonNullable<KeyStoreConfigDTO> = {
      type: 'JKS',
      alias: null,
      managerFactory: null,
      passphrase: null,
      path: null,
      provider: null,
      providerName: null,
      schemaLoadingVersion: null,
    };

    void formik.setFieldValue(fieldName, defaultKeyStore);
  }

  function clearKeyStoreObject(fieldName: 'sslConfig.keyStore' | 'sslConfig.trustStore'): void {
    void formik.setFieldValue(fieldName, null);
  }

  const sslConfig = formik.values.sslConfig;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">TLS Endpoint</Typography>

        <TextField
          fullWidth
          label="Backlog"
          margin="normal"
          name="backlog"
          type="number"
          value={formik.values.backlog ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('backlog'))}
          helperText={getFieldError('backlog')}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.enableReadDelayOnFragmentation ?? false}
              onChange={(event) => {
                void formik.setFieldValue('enableReadDelayOnFragmentation', event.target.checked);
              }}
            />
          }
          label="Enable Read Delay On Fragmentation"
        />

        <TextField
          fullWidth
          label="Fragmentation Limit"
          margin="normal"
          name="fragmentationLimit"
          type="number"
          value={formik.values.fragmentationLimit ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('fragmentationLimit'))}
          helperText={getFieldError('fragmentationLimit')}
        />

        <TextField
          fullWidth
          label="Read Delay On Fragmentation (ms)"
          margin="normal"
          name="readDelayOnFragmentation"
          type="number"
          value={formik.values.readDelayOnFragmentation ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('readDelayOnFragmentation'))}
          helperText={getFieldError('readDelayOnFragmentation')}
        />

        <TextField
          fullWidth
          label="Receive Buffer Size (bytes)"
          margin="normal"
          name="receiveBufferSize"
          type="number"
          value={formik.values.receiveBufferSize ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('receiveBufferSize'))}
          helperText={getFieldError('receiveBufferSize')}
        />

        <TextField
          fullWidth
          label="Send Buffer Size (bytes)"
          margin="normal"
          name="sendBufferSize"
          type="number"
          value={formik.values.sendBufferSize ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('sendBufferSize'))}
          helperText={getFieldError('sendBufferSize')}
        />

        <TextField
          fullWidth
          label="SO_LINGER Delay (seconds)"
          margin="normal"
          name="soLingerDelaySec"
          type="number"
          value={formik.values.soLingerDelaySec ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('soLingerDelaySec'))}
          helperText={getFieldError('soLingerDelaySec')}
        />

        <TextField
          fullWidth
          label="Connection Timeout (ms)"
          margin="normal"
          name="timeout"
          type="number"
          value={formik.values.timeout ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('timeout'))}
          helperText={getFieldError('timeout')}
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          SSL Configuration
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={sslConfig.clientCertificateRequired ?? false}
              onChange={(event) => {
                void formik.setFieldValue('sslConfig.clientCertificateRequired', event.target.checked);
              }}
            />
          }
          label="Client Certificate Required"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={sslConfig.clientCertificateWanted ?? false}
              onChange={(event) => {
                void formik.setFieldValue('sslConfig.clientCertificateWanted', event.target.checked);
              }}
            />
          }
          label="Client Certificate Wanted"
        />

        <TextField
          fullWidth
          label="Context (TLS / TLSv1.2 / TLSv1.3)"
          margin="normal"
          name="sslConfig.context"
          value={sslConfig.context ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('sslConfig.context'))}
          helperText={getFieldError('sslConfig.context')}
        />

        <TextField
          fullWidth
          label="CRL Interval (ms)"
          margin="normal"
          name="sslConfig.crlInterval"
          type="number"
          value={sslConfig.crlInterval ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('sslConfig.crlInterval'))}
          helperText={getFieldError('sslConfig.crlInterval')}
        />

        <TextField
          fullWidth
          label="CRL URL (blank = disabled)"
          margin="normal"
          name="sslConfig.crlUrl"
          value={sslConfig.crlUrl ?? ''}
          onChange={(event) => {
            const value = event.target.value;
            void formik.setFieldValue('sslConfig.crlUrl', value === '' ? null : value);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('sslConfig.crlUrl'))}
          helperText={getFieldError('sslConfig.crlUrl')}
        />

        <Box mt={2}>
          <Typography variant="h6">KeyStore</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(sslConfig.keyStore)}
                onChange={(event) => {
                  if (event.target.checked) {
                    ensureKeyStoreObject('sslConfig.keyStore');
                    return;
                  }
                  clearKeyStoreObject('sslConfig.keyStore');
                }}
              />
            }
            label="Enable KeyStore"
          />

          {sslConfig.keyStore !== null && (
            <>
              <TextField
                fullWidth
                label="KeyStore Path"
                margin="normal"
                name="sslConfig.keyStore.path"
                value={sslConfig.keyStore?.path ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.keyStore.path', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />

              <TextField
                fullWidth
                label="KeyStore Passphrase"
                margin="normal"
                name="sslConfig.keyStore.passphrase"
                type="password"
                value={sslConfig.keyStore?.passphrase ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.keyStore.passphrase', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />
            </>
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="h6">TrustStore</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(sslConfig.trustStore)}
                onChange={(event) => {
                  if (event.target.checked) {
                    ensureKeyStoreObject('sslConfig.trustStore');
                    return;
                  }
                  clearKeyStoreObject('sslConfig.trustStore');
                }}
              />
            }
            label="Enable TrustStore"
          />

          {sslConfig.trustStore !== null && (
            <>
              <TextField
                fullWidth
                label="TrustStore Path"
                margin="normal"
                name="sslConfig.trustStore.path"
                value={sslConfig.trustStore?.path ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.trustStore.path', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />

              <TextField
                fullWidth
                label="TrustStore Passphrase"
                margin="normal"
                name="sslConfig.trustStore.passphrase"
                type="password"
                value={sslConfig.trustStore?.passphrase ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.trustStore.passphrase', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default TlsConfigComponent;
