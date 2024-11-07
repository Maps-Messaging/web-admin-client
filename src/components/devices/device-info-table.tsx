import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import Divider from "@mui/material/Divider";
import {useGetAllDiscoveredDevices} from "@/generated/hardware-management/hardware-management";
import {DeviceInfoRow} from "@/components/devices/device-info-row";



export function DeviceInfoTable(): React.JSX.Element {
  const { data, error, isLoading } = useGetAllDiscoveredDevices({
    query:{
      refetchInterval: 60000
    }
  });

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => (
            <DeviceInfoRow key={device.name} device={device} />
          ))}
        </TableBody>
      </Table>
      <Divider />
      <TablePagination
        component="div"
        count={data?.data?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
