import * as React from "react";
import IMenuCategory from "../../interfaces/IMenuCategory";
import IMenuItem from "../../interfaces/IMenuItem";
import axios from "axios";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import clsx from "clsx";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import {
  TreeItem,
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from "@mui/x-tree-view/TreeItem";
import { Input } from "@mui/material";
import MenuCRUD from "./MenuCRUD";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

interface IMenuConfig {
  closeFunction: () => void;
}

export function MenuConfig(props: IMenuConfig) {
  function addMenu() {}
  const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref
  ) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      preventSelection(event);
    };

    const handleExpansionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      handleExpansion(event);
    };

    const handleSelectionClick = async (event: any) => {
      handleSelection(event);
      setSelectedItem(event.target.innerText);
      getId(event.target.innerText);
    };

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

  const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: TreeItemProps,
    ref: React.Ref<HTMLLIElement>
  ) {
    return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
  });

  const getId = (selectedItem: string) => {
    detailMenuList.map((item) => {
      if (item.menu_name === selectedItem) {
        setDto({
          selected: selectedItem,
          id: item.menu_sub_key,
          detail_id: item.detail_key,
        });
      }
    });
    detailMenuCategory.map((menu) => {
      if (menu.menu_type === selectedItem) {
        setDto({
          selected: selectedItem,
          id: menu.menu_key,
          detail_id: menu.detail_key,
        });
      }
    });
  };

  const [detailMenuList, setDetailMenuList] = React.useState<IMenuItem[]>([]);
  const [detailMenuCategory, setDetailMenuCategory] = React.useState<
    IMenuCategory[]
  >([]);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [dto, setDto] = React.useState<IMenuDTO>();

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
        <Box sx={{ minHeight: 200, flexGrow: 1, minWidth: 200 }}>
          <MenuCRUD {...dto}></MenuCRUD>

          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {detailMenuCategory.map((type) => {
              return (
                <CustomTreeItem
                  key={type.index}
                  nodeId={type.menu_key}
                  label={type.menu_type}
                >
                  {detailMenuList.map((item) => {
                    if (type.detail_key === item.detail_key) {
                      return (
                        <CustomTreeItem
                          key={item.index}
                          nodeId={item.menu_sub_key}
                          label={item.menu_name}
                        ></CustomTreeItem>
                      );
                    }
                  })}
                </CustomTreeItem>
              );
            })}
          </TreeView>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.closeFunction}>
          Close
        </Button>
      </DialogActions>
    </>
  );
}
