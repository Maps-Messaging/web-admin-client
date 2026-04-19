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

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { IdentityAclEntryDTO, PermissionDetailsDTO } from "@/generated/model";

interface AccessAclProps {
  entries: IdentityAclEntryDTO[];
  permissions: PermissionDetailsDTO[];
}

function isServerPermission(permission: PermissionDetailsDTO): boolean {
  return permission.server || false;
}

function splitPermissionLabel(name: string): React.ReactNode {
  const parts = name.split('_');
  return (
    <span style={{ display: 'inline-block', textAlign: 'center', lineHeight: 1.1 }}>
      {parts.map((part, index) => (
        <div key={index}>{part}</div>
      ))}
    </span>
  );
}

function renderPermissionCell(entry: IdentityAclEntryDTO, permission: string): React.ReactNode {
  const list = entry.permissions ?? [];
  const hasPermission = list.includes(permission);
  if (!hasPermission) {
    return null;
  }
  if (entry.effect === 'ALLOW') {
    return <CheckCircleOutlineIcon fontSize="small" color="success" />;
  }
  if (entry.effect === 'DENY') {
    return <CancelIcon fontSize="small" sx={{ color: 'error.main' }} />;
  }
  return null;
}

export default function AccessAcl({
                                        entries,
                                        permissions,
                                      }: AccessAclProps): React.JSX.Element {

  const serverEntries = React.useMemo(
    () => (entries || []).filter((entry) => entry.resourceType === 'Server'),
    [entries],
  );

  const nonServerEntries = React.useMemo(
    () => (entries || []).filter((entry) => entry.resourceType !== 'Server'),
    [entries],
  );

  const serverPermissions = React.useMemo(() => {
    const perms = (permissions || []).filter((perm) => isServerPermission(perm)).map((perm) => perm.name);
    if (perms.length > 0) {
      return  perms.sort((a, b) => (a ?? "").localeCompare(b ?? ""));
    }
    // Fallback: infer from existing server entries
    const set = new Set<string>();
    serverEntries.forEach((entry) => {
      (entry.permissions || []).forEach((perm) => set.add(perm));
    });
    return Array.from(set).sort();
  }, [permissions, serverEntries]);

  const nonServerPermissions = React.useMemo(() => {
    const perms = (permissions || []).filter((perm) => !isServerPermission(perm)).map((perm) => perm.name);
    if (perms.length > 0) {
      return perms.sort((a, b) => (a ?? "").localeCompare(b ?? ""));
    }
    // Fallback: infer from non-server entries
    const set = new Set<string>();
    nonServerEntries.forEach((entry) => {
      (entry.permissions || []).forEach((perm) => set.add(perm));
    });
    return Array.from(set).sort();
  }, [permissions, nonServerEntries]);

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {/* Server permissions */}
      <Typography variant="h6">Server access</Typography>
      {serverEntries.length === 0 || serverPermissions.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No server-specific access entries.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Server ID</TableCell>
              {serverPermissions.map((permission) => (
                <TableCell key={permission} align="center">
                  {splitPermissionLabel(permission || "?")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {serverEntries.map((entry) => (
              <TableRow key={`${entry.resourceType || ""}:${entry.resourceKey || ""}`}>
                <TableCell>{entry.resourceKey || "?"}</TableCell>
                {serverPermissions.map((permission) => (
                  <TableCell key={permission} align="center">
                    {renderPermissionCell(entry, permission || "?")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider />

      {/* Non-server permissions */}
      <Typography variant="h6">Resource access</Typography>
      {nonServerEntries.length === 0 || nonServerPermissions.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No non-server access entries.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Resource type</TableCell>
              <TableCell>Resource key</TableCell>
              {nonServerPermissions.map((permission) => (
                <TableCell key={permission} align="center">
                  {splitPermissionLabel(permission || "?")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {nonServerEntries.map((entry) => (
              <TableRow key={`${entry.resourceType || ""}:${entry.resourceKey ||""}:${entry.effect||""}`}>
                <TableCell>{entry.resourceType}</TableCell>
                <TableCell>{entry.resourceKey}</TableCell>
                {nonServerPermissions.map((permission) => (
                  <TableCell key={permission} align="center">
                    {renderPermissionCell(entry, permission || "?")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
