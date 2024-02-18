import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "@mui/material";

export default function ConfirmationMessage(props: {
  func: () => void;
  open: boolean;
  setOpen: () => void;
  msg?: string;
}) {
  const [password, setPassword] = React.useState<string>("");
  const [wrong, setWrong] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<string>(
    "Are you sure you want to delete it?"
  );
  React.useEffect(() => {
    if (props.msg) {
      setMsg(props.msg);
    }
  }, [props]);
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
            {msg}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          {wrong ? (
            <DialogContentText
              color="red"
              style={{ textAlign: "right", fontSize: "12px" }}
            >
              Password is wrong
            </DialogContentText>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              password !== "0000"
                ? () => {
                    setWrong(true);
                  }
                : () => {
                    setWrong(false);
                    props.func();
                  }
            }
          >
            OK
          </Button>
          <Button onClick={props.setOpen} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
