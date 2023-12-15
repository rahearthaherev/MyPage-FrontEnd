import AlertPopup from "@/app/views/alert";
import { MenuListContext } from "@/app/views/sidevar";
import { Alert, Box, Collapse, Input } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import React from "react";
import ConfirmationMessage from "../common/ConfirmationMessage";

export default function MenuCRUD(props: IMenuDTO) {
  const [open, setOpen] = React.useState(false);
  const [udError, setUdError] = React.useState(false);
  const [aError, setAError] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const dto = React.useRef<IMenuDTO>();
  const menuContext = React.useContext(MenuListContext);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorState, setErrorState] = React.useState(false);

  const menuAdd = async () => {
    dto.current = { ...props, updated: inputText };
    if (inputText === "") {
      setAError(true);
      setUdError(false);
      return;
    }
    if (aError) {
      setAError(false);
    }
    if (udError) {
      setUdError(false);
    }

    const resp = await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/sidemenu/menuadd", dto.current)
      .then(() => {
        setInputText("");
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setErrorState(true);
      });
    menuContext?.resetMenu();
  };

  const menuUpdate = async () => {
    dto.current = { ...props, updated: inputText };
    if (inputText === "") {
      setAError(true);
      setUdError(false);
      return;
    } else if (dto.current.detail_id === "") {
      setAError(false);
      setUdError(true);
      return;
    }
    if (aError) {
      setAError(false);
    }
    if (udError) {
      setUdError(false);
    }

    const resp = await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/sidemenu/menuupdate", dto.current)
      .then(() => {
        setInputText("");
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setErrorState(true);
      });
    menuContext?.resetMenu();
  };

  const menuDelete = async () => {
    dto.current = props;

    if (dto.current.detail_id === "") {
      setAError(false);
      setUdError(true);
      return;
    }
    if (aError) {
      setAError(false);
    }
    if (udError) {
      setUdError(false);
    }
    const resp = await axios
      .post(process.env.NEXT_PUBLIC_SPRING_SERVER + "/sidemenu/menudelete", dto.current)
      .then(() => {
        setOpen(!open);
      })
      .catch((error: Error) => {
        setOpen(!open);
        setErrorMessage("하위 항목이 남아 있는지 확인해주세요.");
        setErrorState(true);
      });
    menuContext?.resetMenu();
  };

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Box display="flex" justifyContent="flex-end">
          <Input
            placeholder="Content"
            value={inputText}
            onChange={(e: any) => {
              setInputText(e.target.value);
            }}
            style={{
              minWidth: "90px",
              width: "100%",
            }}
          />
          <ButtonGroup>
            <Button onClick={menuAdd}>A</Button>
            <Button onClick={menuUpdate} color="secondary">
              U
            </Button>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              color="error"
            >
              D
            </Button>
          </ButtonGroup>
        </Box>
        <Collapse in={udError}>
          <Alert severity="error" sx={{ mb: 2 }}>
            For update or delete, You have to select content
          </Alert>
        </Collapse>
        <Collapse in={aError}>
          <Alert severity="error" sx={{ mb: 2 }}>
            For add or update, You have to fill content
          </Alert>
        </Collapse>
      </Box>
      <ConfirmationMessage
        open={open}
        setOpen={() => {
          setOpen(!open);
        }}
        func={menuDelete}
      />
      <AlertPopup
        message={errorMessage}
        errorState={errorState}
        setErrorState={() => setErrorState(false)}
      />
    </>
  );
}
