"use client";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DRAWERWIDTH } from "../constants";
import { useRecoilState } from "recoil";
import { IsVarOpenAtom } from "../recoil/atoms";
import DetailMenu from "../components/DetailMenu";
import SettingButton from "../components/MenuConfig";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWERWIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const defaultMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWERWIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...defaultMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...defaultMixin(theme),
    "& .MuiDrawer-paper": defaultMixin(theme),
  }),
}));

export default function SideVar() {
  const [open, setOpen] = useRecoilState(IsVarOpenAtom);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open} anchor="right">
        <DrawerHeader>
          {open ? <SettingButton /> : null}
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <DetailMenu></DetailMenu>
        <Divider />
      </Drawer>
    </>
  );
}
