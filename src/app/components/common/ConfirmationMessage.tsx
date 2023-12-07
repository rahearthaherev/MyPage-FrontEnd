import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationMessage(props: {
  func: () => void;
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.func}>OK</Button>
          <Button onClick={props.setOpen} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
