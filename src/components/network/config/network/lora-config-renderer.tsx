import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { LoRaConfig } from '@/generated/model'; // Adjust the import path as necessary

interface LoRaConfigComponentProps {
  config: LoRaConfig;
  onChange: (updatedConfig: LoRaConfig) => void;
}

const LoRaConfigComponent: React.FC<LoRaConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || "lora",
      discoverable: config.discoverable || false,
      selectorThreadCount: config.selectorThreadCount || 1,
      serverReadBufferSize: config.serverReadBufferSize || 10240,
      serverWriteBufferSize: config.serverWriteBufferSize || 10240,
    },
    validationSchema: Yup.object({
      selectorThreadCount: Yup.number().min(1, 'Must be at least 1').required('Required'),
      serverReadBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
      serverWriteBufferSize: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h6">LoRa Configuration</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.discoverable}
              onChange={(event) => formik.setFieldValue('discoverable', event.target.checked)}
            />
          }
          label="Discoverable"
        />

        <TextField
          fullWidth
          label="Selector Thread Count"
          margin="normal"
          name="selectorThreadCount"
          type="number"
          value={formik.values.selectorThreadCount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.selectorThreadCount && formik.errors.selectorThreadCount)}
          helperText={formik.touched.selectorThreadCount && formik.errors.selectorThreadCount}
        />

        <TextField
          fullWidth
          label="Server Read Buffer Size (bytes)"
          margin="normal"
          name="serverReadBufferSize"
          type="number"
          value={formik.values.serverReadBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverReadBufferSize && formik.errors.serverReadBufferSize)}
          helperText={formik.touched.serverReadBufferSize && formik.errors.serverReadBufferSize}
        />

        <TextField
          fullWidth
          label="Server Write Buffer Size (bytes)"
          margin="normal"
          name="serverWriteBufferSize"
          type="number"
          value={formik.values.serverWriteBufferSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.serverWriteBufferSize && formik.errors.serverWriteBufferSize)}
          helperText={formik.touched.serverWriteBufferSize && formik.errors.serverWriteBufferSize}
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

export default LoRaConfigComponent;
