import React from 'react';
import { Box, Typography } from '@mui/material';
import { SerialConfig } from '@/generated/model'; // Adjust import path as necessary

interface SerialConfigComponentProps {
  config: SerialConfig;
  onChange: (updatedConfig: SerialConfig) => void;
}

const SerialConfigComponent: React.FC<SerialConfigComponentProps> = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h6">Serial Port Configuration</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        No additional configuration required for Serial Port.
      </Typography>
    </Box>
  );
};

export default SerialConfigComponent;
