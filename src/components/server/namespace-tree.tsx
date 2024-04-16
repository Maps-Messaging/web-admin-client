'use client'

import {useGetAllDestinations} from "@/generated/destination-management/destination-management";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, {useState} from "react";
import type {Destination} from "@/generated/model";
import {RichTreeView} from "@mui/x-tree-view";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeFile {
  id: string;
  label: string;
  destination: Destination;
}

// Function to build directory tree and file mappings
const buildTree = (destinations: Destination[]): [TreeNode[], Map<string, TreeFile[]>] => {
  const root: TreeNode[] = [];
  const filesMap: Map<string, TreeFile[]> = new Map();
  const pathMap = new Map<string, TreeNode>();
  pathMap.set('/', root[0]);

  destinations.forEach((dest) => {
    const parts = (dest.name || '').split('/').filter(Boolean);
    let currentPath = '';
    parts.forEach((part, index) => {
      const fullPath = currentPath + '/' + part;
      if (index < parts.length - 1) { // It's a directory
        if (!pathMap.has(fullPath)) {
          const newNode: TreeNode = {
            id: fullPath,
            label: part,
            children: [],
          };
          if (index === 0) {
            root.push(newNode);
          } else {
            const parentPath = parts.slice(0, index).join('/');
            pathMap.get('/' + parentPath)?.children?.push(newNode);
          }
          pathMap.set(fullPath, newNode);
        }
      } else { // Last part, it's a file
        const file = { id: fullPath, label: part, destination: dest };
        const parentPath = parts.slice(0, index).join('/');
        if (!filesMap.has('/' + parentPath)) {
          filesMap.set('/' + parentPath, []);
        }
        const files = filesMap.get(currentPath) || [];
        files.push(file);
        files.sort((a, b) => a.label.localeCompare(b.label));
        filesMap.set(currentPath, files);

      }
      currentPath = fullPath;
    });
  });

  return [root, filesMap];
};

const NamespaceTree = () => {

  const { data, error, isLoading } = useGetAllDestinations();

  const [treeData, filesMap] = buildTree(data?.data.data || []);
  const [selectedFiles, setSelectedFiles] = useState<TreeFile[]>([]);

  const handleNodeSelect = (event: React.SyntheticEvent | null, itemId: string ) => {
    setSelectedFiles(filesMap.get(itemId) || []);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;


  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 300, overflowY: 'auto', height: 'calc(100vh - 16px)', bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <RichTreeView
          multiSelect={false}
          items={treeData}
          onItemFocus={handleNodeSelect}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      <Typography variant="h6">Destination Details</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Delayed Messages</TableCell>
                <TableCell align="right">Pending Messages</TableCell>
                <TableCell align="right">Stored Messages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFiles.map((file) => (
                <TableRow key={file.destination.name}>
                  <TableCell component="th" scope="row">{file.label}</TableCell>
                  <TableCell align="right">{file.destination.type}</TableCell>
                  <TableCell align="right">{file.destination.delayedMessages}</TableCell>
                  <TableCell align="right">{file.destination.pendingMessages}</TableCell>
                  <TableCell align="right">{file.destination.storedMessages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
export default NamespaceTree;
