import IAccountBookItem from "@/app/interfaces/IAccountBookItem";
import IAccountBookList from "@/app/interfaces/IAccountBookList";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import WriteForm from "../write/write";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModifyHistoryForm(props: {
  history?: IAccountBookList;
  details?: IAccountBookItem[];
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        props.setOpen;
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Modify history"}</DialogTitle>
      <DialogContentText id="alert-dialog-slide-description">
        <WriteForm date={new Date()} type="modify" />
      </DialogContentText>
    </Dialog>
  );
}
