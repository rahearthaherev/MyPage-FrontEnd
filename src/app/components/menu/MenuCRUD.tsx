import { MenuListContext } from "@/app/views/sidevar";
import { Alert, Box, Collapse, Input } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";

export default function MenuCRUD(props: IMenuDTO) {
  const [udError, setUdError] = React.useState(false);
  const [aError, setAError] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const dto = React.useRef<IMenuDTO>();
  const menuContext = React.useContext(MenuListContext);

  const menuAdd = async () => {
    dto.current = { ...props, updated: inputText };
    if (inputText === "") {
      setAError(true);
      setUdError(false);
      return;
    }
    const resp = await axios.post(
      "http://localhost:6974/sidemenu/menuadd",
      dto.current
    );
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
    const resp = await axios.post(
      "http://localhost:6974/sidemenu/menuupdate",
      dto.current
    );
  };

  const menuDelete = async () => {
    dto.current = props;

    if (dto.current.detail_id === "") {
      setAError(false);
      setUdError(true);
      return;
    }
    const resp = await axios.post(
      "http://localhost:6974/sidemenu/menudelete",
      dto.current
    );
  };

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Input
          placeholder="Content"
          value={inputText}
          onChange={(e: any) => {
            setInputText(e.target.value);
          }}
        />
        <Button onClick={menuAdd}>Add</Button>
        <Button onClick={menuUpdate}>Update</Button>
        <Button onClick={menuDelete}>Delete</Button>
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
    </>
  );
}
