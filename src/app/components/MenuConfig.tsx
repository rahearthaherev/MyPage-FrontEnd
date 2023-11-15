import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import SettingsIcon from "@mui/icons-material/Settings";
import { MenuConfig } from "./MenuConfigMain";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SettingButton() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <React.Fragment>
        <IconButton onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Menu Config
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClick}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <MenuConfig closeFunction={handleClick}></MenuConfig>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}
