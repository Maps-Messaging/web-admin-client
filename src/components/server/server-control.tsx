import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  restartServer,
  shutdownServer,
} from "@/generated/server-management/server-management";

const ServerControl: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<"stop" | "restart" | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleActionClick = (action: "stop" | "restart"): void => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = (): void => {
    setDialogOpen(false);
    setDialogAction(null);
  };

  const handleSnackbarClose = (): void => {
    setSnackbarOpen(false);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!dialogAction) return;

    try {
      setLoading(true);
      if (dialogAction === "stop") {
        await shutdownServer();
      } else {
        await restartServer();
      }
      setSnackbarMessage(`Server ${dialogAction}ed successfully!`);
    } catch (error) {
      setSnackbarMessage(`Failed to ${dialogAction} the server.`);
    } finally {
      setLoading(false);
      handleDialogClose();
      setSnackbarOpen(true);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Server Control</h1>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleActionClick("stop");
          }}
        >
          Stop Server
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleActionClick("restart");
          }}
        >
          Restart Server
        </Button>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {`Confirm ${dialogAction === "stop" ? "Stop" : dialogAction === "restart" ? "Restart" : ""} Server`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {dialogAction} the server? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              void handleConfirm();
            }}
            color={dialogAction === "stop" ? "error" : "primary"}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : `Confirm ${dialogAction ?? ""}`}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={dialogAction === "stop" ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ServerControl;
