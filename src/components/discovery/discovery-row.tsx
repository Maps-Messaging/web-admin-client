import {DiscoveredServers, EndPointDetails} from "@/generated/model";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";

interface DiscoveredRowProps {
  key: string;
  discovered: DiscoveredServers;
}

export function DiscoveryRow({
                               discovered = {},
                                      key=''
                                      }: DiscoveredRowProps): React.JSX.Element {


  function getAllApplications(): string {
    let applications = '';
    if (discovered.serviceInfo) {
      for (const serviceInfo of discovered.serviceInfo) {
        if (serviceInfo.application) {
          if (applications) applications += ', '; // add a separator if applications is not empty
          applications += serviceInfo.application;
        }
      }
    }
    return applications;
  }

  function getAllHostAddresses(): string {
    let addresses = '';
    if (discovered.serviceInfo) {
      for (const serviceInfo of discovered.serviceInfo) {
        if (serviceInfo.hostAddresses) {
          if (addresses) addresses += ', '; // add a separator if applications is not empty
          addresses += serviceInfo.hostAddresses;
        }
      }
    }
    return addresses;
  }


  return (
    <TableRow
      id={key}
    >
      <TableCell>
        <Typography variant="subtitle2">{discovered.server}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{getAllApplications()}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{getAllHostAddresses()}</Typography>
      </TableCell>

    </TableRow>
  );
}
