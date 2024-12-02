/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
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

'use client'

import {useGetAllDestinations} from "@/generated/destination-management/destination-management";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@mui/material';
import React, {useState} from "react";
import {DestinationDTO, DestinationDTOType} from "@/generated/model";
import {RichTreeView} from "@mui/x-tree-view";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import QueueIcon from "@mui/icons-material/Queue";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface TreeNode {
  id: string;
  label: string;
  isFolder: boolean;
  children?: TreeNode[];
}

interface TreeFile {
  id: string;
  label: string;
  destination?: DestinationDTO;
  isFolder?: boolean;
  delayedMessages?: number;
  pendingMessages?: number;
  storedMessages?: number;
}

// Function to build directory tree and file mappings with aggregate calculations
const buildTree = (destinations: DestinationDTO[]): [TreeNode[], Map<string, TreeFile[]>] => {
  const root: TreeNode[] = [];
  const filesMap: Map<string, TreeFile[]> = new Map<string, TreeFile[]>();
  const pathMap = new Map<string, TreeNode>();

  // Initialize root node
  const rootNode: TreeNode = { id: "/", label: "/", isFolder: true, children: [] };
  root.push(rootNode);
  pathMap.set('/', rootNode);

  destinations.forEach((dest) => {
    const parts = (dest.name || '').split('/').filter(Boolean);
    let currentPath = '';

    parts.forEach((part, index) => {
      const fullPath = currentPath + '/' + part;

      if (index < parts.length - 1) {
        // It's a folder
        if (!pathMap.has(fullPath)) {
          const newNode: TreeNode = {
            id: fullPath,
            label: part,
            isFolder: true,
            children: [],
          };
          pathMap.get(currentPath || '/')?.children?.push(newNode);
          pathMap.set(fullPath, newNode);

          // Add this folder to filesMap so it appears in the details when its parent is selected
          const folderEntry: TreeFile = { id: fullPath, label: part, isFolder: true, delayedMessages: 0, pendingMessages: 0, storedMessages: 0 };
          if (!filesMap.has(currentPath || '/')) {
            filesMap.set(currentPath || '/', []);
          }
          filesMap.get(currentPath || '/')?.push(folderEntry);
        }
      } else {
        // It's a destination (file)
        const file: TreeFile = {
          id: fullPath,
          label: part,
          destination: dest,
          delayedMessages: dest.delayedMessages || 0,
          pendingMessages: dest.pendingMessages || 0,
          storedMessages: dest.storedMessages || 0
        };

        if (!filesMap.has(currentPath || '/')) {
          filesMap.set(currentPath || '/', []);
        }
        filesMap.get(currentPath || '/')?.push(file);
      }
      currentPath = fullPath;
    });
  });

  // Compute aggregate values for folders
  filesMap.forEach((contents, folderPath) => {
    const folder = contents.find(item => item.isFolder && item.id === folderPath);
    if (folder) {
      folder.delayedMessages = contents.reduce((sum, item) => sum + (item.delayedMessages || 0), 0);
      folder.pendingMessages = contents.reduce((sum, item) => sum + (item.pendingMessages || 0), 0);
      folder.storedMessages = contents.reduce((sum, item) => sum + (item.storedMessages || 0), 0);
    }
  });

  return [root, filesMap];
};

const NamespaceTree = (): React.JSX.Element => {
  const { data, error, isLoading } = useGetAllDestinations();
  const [treeData, filesMap] = buildTree(data?.data.data || []);
  const [selectedFiles, setSelectedFiles] = useState<TreeFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleNodeSelect = (event: React.SyntheticEvent | null, itemId: string): void => {
    setSelectedFolder(itemId);
    setSelectedFiles(filesMap.get(itemId) || []);
    setSelectedItem(itemId);  // Synchronize selection in the tree view
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedFiles(filesMap.get(folderId) || []);
    setSelectedItem(folderId);  // Synchronize selection in the tree view
  };

  const handleUpOneLevel = () => {
    if (selectedFolder && selectedFolder !== "/") {
      const parentPath = selectedFolder.split('/').slice(0, -1).join('/') || '/';
      setSelectedFolder(parentPath);
      setSelectedFiles(filesMap.get(parentPath) || []);
      setSelectedItem(parentPath);  // Synchronize selection in the tree view
    }
  };

  const getIcon = (item: TreeFile): React.ReactElement | null => {
    if (item.isFolder) return <FolderIcon />; // Folder icon for folders
    switch (item.destination?.type) {
      case DestinationDTOType.topic:
        return <ForumIcon />;
      case DestinationDTOType.queue:
        return <QueueIcon />;
      default:
        return <ForumIcon />;
    }
  };

  const getBaseName = (path: string): string => {
    return path.split('/').filter(Boolean).pop() || path;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <Box sx={{ display: 'flex', height: '80vh' }}>
      <Box sx={{ width: 300, overflowY: 'auto', bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <RichTreeView
          selectedItems={selectedItem}
          multiSelect={false}
          items={treeData}
          onItemFocus={handleNodeSelect}
        />
      </Box>
      <Box sx={{ flex: 1, paddingLeft: 2 }}>
        <Typography variant="h6">Destination Details</Typography>
        <TextField
          label="Path"
          value={selectedFolder || ''}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
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
              {selectedFolder && selectedFolder !== "/" && (
                <TableRow onClick={handleUpOneLevel} style={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row">
                    <ArrowUpwardIcon /><span> ..</span>
                  </TableCell>
                  <TableCell align="right">Go up</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
              )}
              {selectedFiles.map((file) => (
                <TableRow
                  key={file.id}
                  onClick={() => { if (file.isFolder) handleFolderClick(file.id); }}
                  style={{ cursor: file.isFolder ? 'pointer' : 'default' }}
                >
                  <TableCell component="th" scope="row">
                    {getIcon(file)}<span> {getBaseName(file.id)}</span>
                  </TableCell>
                  <TableCell align="right">{file.isFolder ? "Folder" : file.destination?.type}</TableCell>
                  <TableCell align="right">{file.delayedMessages ?? '-'}</TableCell>
                  <TableCell align="right">{file.pendingMessages ?? '-'}</TableCell>
                  <TableCell align="right">{file.storedMessages ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default NamespaceTree;
