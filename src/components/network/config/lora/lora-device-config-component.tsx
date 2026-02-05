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

import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, MenuItem, TextField } from '@mui/material';

import type { LoRaChipConfigDTO, LoRaChipConfigDTOAllOfFrequency } from '@/generated/model';
import { LoRaChipConfigDTOAllOfFrequency as LoRaFrequencyEnum } from '@/generated/model';

interface LoRaDeviceConfigComponentProps {
  config: LoRaChipConfigDTO;
  onChange: (updatedConfig: LoRaChipConfigDTO) => void;
}

const frequencyValues = Object.values(LoRaFrequencyEnum) as LoRaChipConfigDTOAllOfFrequency[];

function LoRaDeviceConfigComponent({ config, onChange }: LoRaDeviceConfigComponentProps): React.JSX.Element {
  const formik = useFormik<LoRaChipConfigDTO>({
    initialValues: {
      type: config.type ?? ('loraChip' as LoRaChipConfigDTO['type']),
      name: config.name ?? '',
      address: config.address ?? 1,
      frequency: config.frequency ?? LoRaFrequencyEnum.NUMBER_863,
      power: config.power ?? 14,
      radio: config.radio ?? '',
      transmissionRate: config.transmissionRate ?? 0,
      hexKey: config.hexKey ?? null,
      hardware: {
        cadTimeout: config.hardware?.cadTimeout ?? 1,
        cs: config.hardware?.cs ?? 0,
        irq: config.hardware?.irq ?? 0,
        rst: config.hardware?.rst ?? 0,
        schemaLoadingVersion: config.hardware?.schemaLoadingVersion ?? null,
        radio: config.hardware?.radio ?? undefined,
      },
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),

      address: Yup.number().min(1, 'Must be at least 1').max(254, 'Must be at most 254').notRequired(),

      frequency: Yup.mixed<LoRaChipConfigDTOAllOfFrequency>()
        .oneOf(frequencyValues, 'Invalid frequency')
        .required('Required'),

      power: Yup.number().min(0, 'Must be at least 0').max(16, 'Must be at most 16').notRequired(),

      radio: Yup.string().notRequired(),

      transmissionRate: Yup.number().min(0, 'Must be at least 0').max(1024, 'Must be at most 1024').notRequired(),

      hexKey: Yup.string().nullable().notRequired(),

      hardware: Yup.object({
        cadTimeout: Yup.number().min(1, 'Must be at least 1').max(512, 'Must be at most 512').required('Required'),
        cs: Yup.number().min(0, 'Must be at least 0').max(255, 'Must be at most 255').required('Required'),
        irq: Yup.number().min(0, 'Must be at least 0').max(255, 'Must be at most 255').required('Required'),
        rst: Yup.number().min(0, 'Must be at least 0').max(255, 'Must be at most 255').required('Required'),
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

  function renderNumberField(
    label: string,
    name: string,
    value: number | null | undefined
  ): React.JSX.Element {
    const fieldError = getFieldError(name);
    return (
      <TextField
        fullWidth
        label={label}
        margin="normal"
        name={name}
        type="number"
        value={value ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(fieldError)}
        helperText={fieldError}
      />
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          value={formik.values.name ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('name'))}
          helperText={getFieldError('name')}
        />

        {renderNumberField('Address', 'address', formik.values.address)}

        <TextField
          select
          fullWidth
          label="Frequency (MHz)"
          margin="normal"
          name="frequency"
          value={formik.values.frequency ?? LoRaFrequencyEnum.NUMBER_863}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('frequency'))}
          helperText={getFieldError('frequency')}
        >
          {frequencyValues.map((freq) => (
            <MenuItem key={freq} value={freq}>
              {freq} MHz
            </MenuItem>
          ))}
        </TextField>

        {renderNumberField('Power', 'power', formik.values.power)}

        <TextField
          fullWidth
          label="Radio"
          margin="normal"
          name="radio"
          value={formik.values.radio ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('radio'))}
          helperText={getFieldError('radio')}
        />

        {renderNumberField(
          'Transmission Rate (packets/sec, 0 = unlimited)',
          'transmissionRate',
          formik.values.transmissionRate
        )}

        <TextField
          fullWidth
          label="Hex Key (16 bytes hex, optional)"
          margin="normal"
          name="hexKey"
          value={formik.values.hexKey ?? ''}
          onChange={(event) => {
            const value = event.target.value;
            void formik.setFieldValue('hexKey', value === '' ? null : value);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('hexKey'))}
          helperText={getFieldError('hexKey')}
        />

        {renderNumberField('CAD Timeout', 'hardware.cadTimeout', formik.values.hardware?.cadTimeout)}
        {renderNumberField('Chip Select (CS) Pin', 'hardware.cs', formik.values.hardware?.cs)}
        {renderNumberField('IRQ Pin', 'hardware.irq', formik.values.hardware?.irq)}
        {renderNumberField('Reset (RST) Pin', 'hardware.rst', formik.values.hardware?.rst)}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default LoRaDeviceConfigComponent;
