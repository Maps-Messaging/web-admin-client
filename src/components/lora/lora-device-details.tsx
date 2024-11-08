// LoRaDeviceDetails.tsx

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import { type LoRaDeviceInfo } from "@/generated/model";
import {useGetAllLoRaDevices} from "@/generated/lora-device-management/lora-device-management";
import {LoRaDeviceTable} from "@/components/lora/lora-device-table";


export default function LoRaDeviceDetails(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;
  const { data, error, isLoading } = useGetAllLoRaDevices();

  if (isLoading) return <div>Loading devices...</div>;
  if (error) return <div>Error loading devices: {error.message}</div>;

  const paginatedDevices = applyPagination((data?.data.data || []), page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Typography variant="h4">LoRa Devices</Typography>
      <LoRaDeviceTable
        count={paginatedDevices.length}
        page={page}
        rows={paginatedDevices}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: LoRaDeviceInfo[], page: number, rowsPerPage: number): LoRaDeviceInfo[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
