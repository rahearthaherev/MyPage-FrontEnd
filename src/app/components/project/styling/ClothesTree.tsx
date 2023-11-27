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
  const { type, setSelectedType, setItem } = props;
  const [clothesList, setClothesList] = React.useState<IClothesItem[]>([]);

  const getClothesList = async () => {
    await axios
      .get("http://localhost:6974/projects/styling/gettype")
      .then((resp: any) => {
        setClothesList(resp.data);
      });
  };

  React.useEffect(() => {
    getClothesList();
  }, []);
  return (
    <Grid item xs={12}>
      <Typography variant="h4" sx={{ marginBottom: "5px" }}>
        ◆持ち物
      </Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
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
                nodeId={index.toString()}
                label={type.type}
                sx={{ display: "block" }}
                onClick={(e: any) => {
                  setSelectedType(e.target.innerText);
                }}
              ></TreeItem>
            </Box>
          );
        })}
      </TreeView>
    </Grid>
  );
}
