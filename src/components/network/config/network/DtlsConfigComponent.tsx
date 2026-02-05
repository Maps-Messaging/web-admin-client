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

import type React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import type { DtlsConfigDTO } from '@/generated/model';

interface DtlsConfigComponentProps {
  config: DtlsConfigDTO;
  onChange: (updatedConfig: DtlsConfigDTO) => void;
}

function DtlsConfigComponent({ config, onChange }: DtlsConfigComponentProps): React.JSX.Element {
  const formik = useFormik<DtlsConfigDTO>({
    initialValues: {
      type: config.type ?? ('dtls' as DtlsConfigDTO['type']),

      packetReuseTimeout: config.packetReuseTimeout ?? 10,
      idleSessionTimeout: config.idleSessionTimeout ?? 60,
      hmacHostLookupCacheExpiry: config.hmacHostLookupCacheExpiry ?? 10,
      hmacConfigList: config.hmacConfigList ?? [],

      sslConfig: config.sslConfig
        ? {
          clientCertificateRequired: config.sslConfig.clientCertificateRequired ?? false,
          clientCertificateWanted: config.sslConfig.clientCertificateWanted ?? false,
          context: config.sslConfig.context ?? 'TLS',
          crlInterval: config.sslConfig.crlInterval ?? 60000,
          crlUrl: config.sslConfig.crlUrl ?? null,

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
      packetReuseTimeout: Yup.number()
        .min(10, 'Must be at least 10 ms')
        .max(60000, 'Must be at most 60000 ms')
        .notRequired(),

      idleSessionTimeout: Yup.number()
        .min(60, 'Must be at least 60 seconds')
        .max(1200, 'Must be at most 1200 seconds')
        .notRequired(),

      hmacHostLookupCacheExpiry: Yup.number()
        .min(10, 'Must be at least 10 seconds')
        .max(1200, 'Must be at most 1200 seconds')
        .notRequired(),

      sslConfig: Yup.object({
        clientCertificateRequired: Yup.boolean().required(),
        clientCertificateWanted: Yup.boolean().required(),

        context: Yup.string()
          .matches(/^TLS(?:v1\.(?:2|3))?$/, 'Must be TLS, TLSv1.2, or TLSv1.3')
          .required('Required'),

        crlInterval: Yup.number()
          .min(60000, 'Must be at least 60000 ms')
          .max(2419200000, 'Must be at most 2419200000 ms')
          .required('Required'),

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

    if (!meta.touched) {
      return undefined;
    }

    if (meta.error === undefined || meta.error === null) {
      return undefined;
    }

    return typeof meta.error === 'string' ? meta.error : 'Invalid value';
  }

  function ensureKeyStoreObject(fieldName: 'sslConfig.keyStore' | 'sslConfig.trustStore'): void {
    const sslConfig = formik.values.sslConfig;
    if (!sslConfig) {
      return;
    }

    const currentValue =
      fieldName === 'sslConfig.keyStore' ? sslConfig.keyStore : sslConfig.trustStore;

    if (currentValue) {
      return;
    }

    void formik.setFieldValue(fieldName, {
      type: 'JKS',
      alias: null,
      managerFactory: null,
      passphrase: null,
      path: null,
      provider: null,
      providerName: null,
      schemaLoadingVersion: null,
    });
  }

  function clearKeyStoreObject(fieldName: 'sslConfig.keyStore' | 'sslConfig.trustStore'): void {
    void formik.setFieldValue(fieldName, null);
  }

  const hasKeyStore = Boolean(formik.values.sslConfig?.keyStore);
  const hasTrustStore = Boolean(formik.values.sslConfig?.trustStore);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">UDP / DTLS</Typography>

        <TextField
          fullWidth
          label="Packet Reuse Timeout (ms)"
          margin="normal"
          name="packetReuseTimeout"
          type="number"
          value={formik.values.packetReuseTimeout ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('packetReuseTimeout'))}
          helperText={getFieldError('packetReuseTimeout')}
        />

        <TextField
          fullWidth
          label="Idle Session Timeout (seconds)"
          margin="normal"
          name="idleSessionTimeout"
          type="number"
          value={formik.values.idleSessionTimeout ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('idleSessionTimeout'))}
          helperText={getFieldError('idleSessionTimeout')}
        />

        <TextField
          fullWidth
          label="HMAC Host Lookup Cache Expiry (seconds)"
          margin="normal"
          name="hmacHostLookupCacheExpiry"
          type="number"
          value={formik.values.hmacHostLookupCacheExpiry ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('hmacHostLookupCacheExpiry'))}
          helperText={getFieldError('hmacHostLookupCacheExpiry')}
        />

        <Typography variant="h6" sx={{ mt: 3 }}>
          SSL Configuration
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.sslConfig?.clientCertificateRequired ?? false}
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
              checked={formik.values.sslConfig?.clientCertificateWanted ?? false}
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
          value={formik.values.sslConfig?.context ?? ''}
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
          value={formik.values.sslConfig?.crlInterval ?? ''}
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
          value={formik.values.sslConfig?.crlUrl ?? ''}
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
                checked={hasKeyStore}
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

          {hasKeyStore ? (
            <>
              <TextField
                fullWidth
                label="KeyStore Path"
                margin="normal"
                name="sslConfig.keyStore.path"
                value={formik.values.sslConfig?.keyStore?.path ?? ''}
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
                value={formik.values.sslConfig?.keyStore?.passphrase ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.keyStore.passphrase', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />
            </>
          ) : null}
        </Box>

        <Box mt={2}>
          <Typography variant="h6">TrustStore</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={hasTrustStore}
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

          {hasTrustStore ? (
            <>
              <TextField
                fullWidth
                label="TrustStore Path"
                margin="normal"
                name="sslConfig.trustStore.path"
                value={formik.values.sslConfig?.trustStore?.path ?? ''}
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
                value={formik.values.sslConfig?.trustStore?.passphrase ?? ''}
                onChange={(event) => {
                  const value = event.target.value;
                  void formik.setFieldValue('sslConfig.trustStore.passphrase', value === '' ? null : value);
                }}
                onBlur={formik.handleBlur}
              />
            </>
          ) : null}
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

export default DtlsConfigComponent;
