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
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';

import type { SerialConfigDTO } from '@/generated/model';
import {
  SerialConfigDTOProxyProtocolMode,
  SerialDeviceDTOBaudRate,
  SerialDeviceDTODataBits,
  SerialDeviceDTOFlowControl,
  SerialDeviceDTOParity,
  SerialDeviceDTOStopBits,
} from '@/generated/model';

interface SerialConfigComponentProps {
  config: SerialConfigDTO;
  onChange: (updatedConfig: SerialConfigDTO) => void;
}

const baudRateValues: number[] = Object.values(SerialDeviceDTOBaudRate) as number[];
const dataBitsValues: number[] = Object.values(SerialDeviceDTODataBits) as number[];
const flowControlValues: number[] = Object.values(SerialDeviceDTOFlowControl) as number[];
const parityValues: string[] = Object.values(SerialDeviceDTOParity) as string[];
const stopBitsValues: number[] = Object.values(SerialDeviceDTOStopBits) as number[];

const proxyModeValues: string[] = Object.values(SerialConfigDTOProxyProtocolMode).filter(
  (value) => value !== null
) as string[];

function SerialConfigComponent({ config, onChange }: SerialConfigComponentProps): React.JSX.Element {
  const formik = useFormik<SerialConfigDTO>({
    initialValues: {
      type: config.type ?? ('serial' as SerialConfigDTO['type']),

      allowedProxyHosts: config.allowedProxyHosts ?? null,
      proxyProtocolMode: config.proxyProtocolMode ?? SerialConfigDTOProxyProtocolMode.DISABLED,
      connectionTimeout: config.connectionTimeout ?? 1000,
      discoverable: config.discoverable ?? false,

      schemaLoadingVersion: config.schemaLoadingVersion ?? null,
      selectorThreadCount: config.selectorThreadCount ?? null,

      serverReadBufferSize: config.serverReadBufferSize ?? 1024,
      serverWriteBufferSize: config.serverWriteBufferSize ?? 1024,

      serialDevice: {
        port: config.serialDevice?.port ?? '',
        baudRate: config.serialDevice?.baudRate ?? SerialDeviceDTOBaudRate.NUMBER_9600,
        dataBits: config.serialDevice?.dataBits ?? SerialDeviceDTODataBits.NUMBER_8,
        stopBits: config.serialDevice?.stopBits ?? SerialDeviceDTOStopBits.NUMBER_1,
        parity: config.serialDevice?.parity ?? SerialDeviceDTOParity.n,
        flowControl: config.serialDevice?.flowControl ?? SerialDeviceDTOFlowControl.NUMBER_0,

        readTimeOut: config.serialDevice?.readTimeOut ?? 1000,
        writeTimeOut: config.serialDevice?.writeTimeOut ?? 1000,
        bufferSize: config.serialDevice?.bufferSize ?? 1024,

        schemaLoadingVersion: config.serialDevice?.schemaLoadingVersion ?? null,
        serialNo: config.serialDevice?.serialNo ?? null,
      },
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      allowedProxyHosts: Yup.string()
        .nullable()
        .matches(/^\s*[^,\s][^,]*\s*(?:,\s*[^,\s][^,]*\s*)*$/, 'Invalid comma-separated host list')
        .notRequired(),

      connectionTimeout: Yup.number()
        .min(1000, 'Must be at least 1000 ms')
        .max(120000, 'Must be at most 120000 ms')
        .notRequired(),

      proxyProtocolMode: Yup.mixed<string>()
        .oneOf(proxyModeValues, 'Invalid proxy protocol mode')
        .nullable()
        .notRequired(),

      serverReadBufferSize: Yup.number()
        .min(1024, 'Must be at least 1024 bytes')
        .max(104857600, 'Must be at most 104857600 bytes')
        .notRequired(),

      serverWriteBufferSize: Yup.number()
        .min(1024, 'Must be at least 1024 bytes')
        .max(104857600, 'Must be at most 104857600 bytes')
        .notRequired(),

      serialDevice: Yup.object({
        port: Yup.string().required('Port is required'),

        baudRate: Yup.number()
          .oneOf(baudRateValues, 'Invalid baud rate')
          .required('Required'),

        dataBits: Yup.number()
          .oneOf(dataBitsValues, 'Invalid data bits')
          .required('Required'),

        stopBits: Yup.number()
          .oneOf(stopBitsValues, 'Invalid stop bits')
          .required('Required'),

        parity: Yup.string()
          .oneOf(parityValues, 'Invalid parity')
          .required('Required'),

        flowControl: Yup.number()
          .oneOf(flowControlValues, 'Invalid flow control')
          .required('Required'),

        readTimeOut: Yup.number()
          .min(1000, 'Must be at least 1000 ms')
          .max(600000, 'Must be at most 600000 ms')
          .required('Required'),

        writeTimeOut: Yup.number()
          .min(1000, 'Must be at least 1000 ms')
          .max(600000, 'Must be at most 600000 ms')
          .notRequired(),

        bufferSize: Yup.number()
          .min(1024, 'Must be at least 1024 bytes')
          .max(1048576, 'Must be at most 1048576 bytes')
          .notRequired(),
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

  function renderNumberField(label: string, name: string, value: number | null | undefined): React.JSX.Element {
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

  function renderTextField(label: string, name: string, value: string | null | undefined): React.JSX.Element {
    const fieldError = getFieldError(name);
    return (
      <TextField
        fullWidth
        label={label}
        margin="normal"
        name={name}
        value={value ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(fieldError)}
        helperText={fieldError}
      />
    );
  }

  const proxyProtocolModeValue: string =
    (formik.values.proxyProtocolMode ?? SerialConfigDTOProxyProtocolMode.DISABLED) as string;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">Serial Port Configuration</Typography>

        {renderTextField('Port', 'serialDevice.port', formik.values.serialDevice.port)}

        <TextField
          fullWidth
          select
          label="Baud Rate"
          margin="normal"
          name="serialDevice.baudRate"
          value={formik.values.serialDevice.baudRate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('serialDevice.baudRate'))}
          helperText={getFieldError('serialDevice.baudRate')}
        >
          {baudRateValues.map((rate) => (
            <MenuItem key={rate} value={rate}>
              {rate}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Data Bits"
          margin="normal"
          name="serialDevice.dataBits"
          value={formik.values.serialDevice.dataBits}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('serialDevice.dataBits'))}
          helperText={getFieldError('serialDevice.dataBits')}
        >
          {dataBitsValues.map((bits) => (
            <MenuItem key={bits} value={bits}>
              {bits}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Stop Bits"
          margin="normal"
          name="serialDevice.stopBits"
          value={formik.values.serialDevice.stopBits}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('serialDevice.stopBits'))}
          helperText={getFieldError('serialDevice.stopBits')}
        >
          {stopBitsValues.map((bits) => (
            <MenuItem key={bits} value={bits}>
              {bits}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Parity"
          margin="normal"
          name="serialDevice.parity"
          value={formik.values.serialDevice.parity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('serialDevice.parity'))}
          helperText={getFieldError('serialDevice.parity')}
        >
          {parityValues.map((parity) => (
            <MenuItem key={parity} value={parity}>
              {parity.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Flow Control"
          margin="normal"
          name="serialDevice.flowControl"
          value={formik.values.serialDevice.flowControl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('serialDevice.flowControl'))}
          helperText={getFieldError('serialDevice.flowControl')}
        >
          <MenuItem value={SerialDeviceDTOFlowControl.NUMBER_0}>None</MenuItem>
          <MenuItem value={SerialDeviceDTOFlowControl.NUMBER_1}>Hardware In</MenuItem>
          <MenuItem value={SerialDeviceDTOFlowControl.NUMBER_2}>Hardware Out</MenuItem>
          <MenuItem value={SerialDeviceDTOFlowControl.NUMBER_3}>XON/XOFF</MenuItem>
        </TextField>

        {renderNumberField('Read Timeout (ms)', 'serialDevice.readTimeOut', formik.values.serialDevice.readTimeOut)}
        {renderNumberField('Write Timeout (ms)', 'serialDevice.writeTimeOut', formik.values.serialDevice.writeTimeOut)}
        {renderNumberField('Device Buffer Size (bytes)', 'serialDevice.bufferSize', formik.values.serialDevice.bufferSize)}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Endpoint Buffers
        </Typography>

        {renderNumberField('Server Read Buffer Size (bytes)', 'serverReadBufferSize', formik.values.serverReadBufferSize)}
        {renderNumberField('Server Write Buffer Size (bytes)', 'serverWriteBufferSize', formik.values.serverWriteBufferSize)}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Proxy Protocol
        </Typography>

        {renderTextField('Allowed Proxy Hosts (comma-separated)', 'allowedProxyHosts', formik.values.allowedProxyHosts)}

        <TextField
          fullWidth
          select
          label="Proxy Protocol Mode"
          margin="normal"
          name="proxyProtocolMode"
          value={proxyProtocolModeValue}
          onChange={(event) => {
            void formik.setFieldValue('proxyProtocolMode', event.target.value);
          }}
          onBlur={formik.handleBlur}
          error={Boolean(getFieldError('proxyProtocolMode'))}
          helperText={getFieldError('proxyProtocolMode')}
        >
          <MenuItem value={SerialConfigDTOProxyProtocolMode.DISABLED}>DISABLED</MenuItem>
          <MenuItem value={SerialConfigDTOProxyProtocolMode.ENABLED}>ENABLED</MenuItem>
          <MenuItem value={SerialConfigDTOProxyProtocolMode.REQUIRED}>REQUIRED</MenuItem>
        </TextField>

        {renderNumberField('Connection Timeout (ms)', 'connectionTimeout', formik.values.connectionTimeout)}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SerialConfigComponent;
