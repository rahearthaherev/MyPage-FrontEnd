import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function AlertPopup(props: {
  message: string;
  errorState: boolean;
  setErrorState: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    props.setErrorState();
  };

  React.useEffect(() => {
    setOpen(props.errorState);
  }, [props.errorState]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
