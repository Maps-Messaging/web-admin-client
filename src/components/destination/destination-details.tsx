import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type {Destination} from "@/generated/model";
import ForumIcon from '@mui/icons-material/Forum';
import QueueIcon from '@mui/icons-material/Queue';
import FolderIcon from '@mui/icons-material/Folder';

interface DestinationDetailsProps {
  name:string,
  destination: Destination,
  isFolder: boolean
}

function DestinationDetails( props : DestinationDetailsProps ): React.JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) : void => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  // Handles button click for IconButton
  const handleIconButtonClick = (event: React.MouseEvent<HTMLButtonElement>) : void => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const getIcon = (): React.ReactElement | null => {
    if(props.isFolder){
      return <FolderIcon />;
    }
    switch (props.destination.type) {
      case 'Topic':
        return <ForumIcon />;
      case 'Queue':
        return <QueueIcon />;
      default:
        return <FolderIcon />;
    }
  };

  const handleClose = () : void => {
    setAnchorEl(null);
  };

  const tooltipTitle = (
    <React.Fragment>
      <Typography color="inherit">Statistics</Typography>
      <p>{`Delayed Messages: ${props.destination.delayedMessages?.toString() || "0"}`}</p>
      <p>{`Pending Messages: ${props.destination.pendingMessages?.toString()|| "0"}`}</p>
      <p>{`Stored Messages: ${props.destination.storedMessages?.toString() || "0"}`}</p>
    </React.Fragment>
  );

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Card onContextMenu={handleContextMenu} style={{cursor: 'context-menu' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
              {getIcon()}
              <span style={{ marginLeft: '10px' }}>{props.name}</span>
            </Typography>
            <Typography color="textSecondary">Type: {props.destination?.type ||''}</Typography>
          </CardContent>
        </CardActionArea>
        <IconButton aria-label="settings" onClick={handleIconButtonClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Action 1</MenuItem>
          <MenuItem onClick={handleClose}>Action 2</MenuItem>
        </Menu>
      </Card>
    </Tooltip>
  );
}

export default DestinationDetails;
