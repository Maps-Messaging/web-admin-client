import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
} from '@mui/material';
import { AmqpConfig } from '@/generated/model'; // Adjust import path as necessary

interface AmqpConfigComponentProps {
  config: AmqpConfig;
  onChange: (updatedConfig: AmqpConfig) => void;
}

const AmqpConfigComponent: React.FC<AmqpConfigComponentProps> = ({ config, onChange }) => {
  // Define initial values and validation schema
  const formik = useFormik({
    initialValues: {
      type: config.type || 'amqp',
      remoteAuthConfig: config.remoteAuthConfig,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        {/* ProtocolConfig Fields */}

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
