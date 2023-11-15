import * as React from "react";
import IMenuCategory from "../interfaces/IMenuCategory";
import IMenuItem from "../interfaces/IMenuItem";
import axios from "axios";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface IMenuConfig {
  closeFunction: () => void;
}

export function MenuConfig(props: IMenuConfig) {
  const [detailMenuList, setDetailMenuList] = React.useState<IMenuItem[]>([]);
  const [detailMenuCategory, setDetailMenuCategory] = React.useState<
    IMenuCategory[]
  >([]);

  const getMenu = async () => {
    await axios.get("http://localhost:6974/sidemenu/menuitem").then((resp) => {
      setDetailMenuList(resp.data);
    });
    await axios
      .get("http://localhost:6974/sidemenu/menucategory")
      .then((resp) => {
        setDetailMenuCategory(resp.data);
      });
  };

  React.useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.closeFunction}>
          Save changes
        </Button>
      </DialogActions>
    </>
  );
}
