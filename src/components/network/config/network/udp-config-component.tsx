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
import {Box, Button, TextField} from '@mui/material';
import {UdpConfigDTO} from "@/generated/model";


interface UdpConfigComponentProps {
  config: UdpConfigDTO;
  onChange: (updatedConfig: UdpConfigDTO) => void;
}

const UdpConfigComponent: React.FC<UdpConfigComponentProps> = ({ config, onChange }) => {
  const formik = useFormik({
    initialValues: {
      type: config.type || 'udp',
      hmacConfigList: config.hmacConfigList || [],
      hmacHostLookupCacheExpiry: config.hmacHostLookupCacheExpiry || 0,
      idleSessionTimeout: config.idleSessionTimeout || 0,
      packetReuseTimeout: config.packetReuseTimeout || 0,
    },
    validationSchema: Yup.object({
      hmacHostLookupCacheExpiry: Yup.number().min(0, 'Must be at least 0').required('Required'),
      idleSessionTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
      packetReuseTimeout: Yup.number().min(0, 'Must be at least 0').required('Required'),
    }),
    onSubmit: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Save Configuration
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default UdpConfigComponent;
