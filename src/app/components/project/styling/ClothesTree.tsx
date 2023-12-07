import IClothesTreeProps from "@/app/interfaces/IClothesProps";
import { Box, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import * as React from "react";
import axios from "axios";
import { IClothesItem } from "@/app/interfaces/IClothes";

export default function ClothesTree(props: IClothesTreeProps) {
  const { type, resetTrigger, setSelectedType, setItem, setStatus } = props;
  const [clothesList, setClothesList] = React.useState<IClothesItem[]>([]);

  const getClothesList = async () => {
    await axios
      .get("http://192.168.100.90:7000/projects/styling/getlist")
      .then((resp: any) => {
        setClothesList(resp.data);
      });
  };

  const setSeletedItem = (type: string, item: string, status: number) => {
    setSelectedType(type);
    setItem(item);
    setStatus(status);
  };
  React.useEffect(() => {
    getClothesList();
  }, [props.resetTrigger]);
  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <img
          src="/assets/images/ワードローブ.png"
          alt="ワードローブ"
          width="80px"
          height="80px"
          style={{ border: "1px solid black" }}
        />
        <Typography variant="h4" sx={{ marginLeft: "15px" }}>
          ワードローブ
        </Typography>
      </Box>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
          marginTop: "30px",
        }}
      >
        {type.map((type, index) => {
          return (
            <Box display="flex" key={index}>
              <img
                src={`/assets/images/${type.type}.png`}
                alt={type.type}
                width="20px"
                height="20px"
              ></img>
              <TreeItem
                nodeId={type.type}
                label={type.type}
                sx={{ display: "block" }}
                onClick={(e: any) => {
                  setSeletedItem(type.type, "", 0);
                }}
              >
                {clothesList.map((cloth, index) => {
                  if (cloth.type === type.type) {
                    return (
                      <TreeItem
                        nodeId={cloth.index?.toString()!}
                        key={index}
                        label={`・${cloth.name}${clothStatus(cloth.status!)}`}
                        onClick={() => {
                          setSeletedItem(type.type, cloth.name, cloth.status!);
                        }}
                      ></TreeItem>
                    );
                  }
                })}
              </TreeItem>
            </Box>
          );
        })}
      </TreeView>
    </Grid>
  );
}

function clothStatus(status: number) {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "(洗濯前)";
    case 2:
      return "(洗濯中)";
    case 3:
      return "(乾燥中)";
  }
}
