import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import axios from "axios";
import IMenuItem from "@/app/interfaces/IMenuItem";

export default async function Header(props: { title: string; typeId: string }) {
  const navItems = ["a"];
  const resp = axios.get("http://localhost:6974/board/header");
  const data = resp.data;
  console.log(props.title);
  return (
    <>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "grey" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontSize: 30,
              marginLeft: "64px",
            }}
          >
            {props.title}
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "150px" }}
          >
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
