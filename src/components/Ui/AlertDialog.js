import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            background: "rgb(60, 60, 60)",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "2px",
          }}
        >
          Leaving Page
        </DialogTitle>
        <DialogContent sx={{ background: "rgb(60, 60, 60)" }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "rgb(230, 230, 230)",
              fontSize: "1.1rem",
              letterSpacing: "1.5px",
            }}
          >
            Are you sure you want to leave the page? All chat data will be lost.
            We don't store your chat data to protect your privacy and ensure
            data security. If you leave the page, your conversation history will
            not be accessible later.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            background: "rgb(60, 60, 60)",
          }}
        >
          <Button
            onClick={props.onCancel}
            sx={{
              color: "rgb(142, 199, 245)",
              fontSize: "1.15rem",
              letterSpacing: "1px",
            }}
          >
            Stay
          </Button>
          <Button
            onClick={props.onAgree}
            autoFocus
            sx={{
              color: "rgb(142, 199, 245)",
              fontSize: "1.15rem",
              letterSpacing: "1px",
            }}
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
