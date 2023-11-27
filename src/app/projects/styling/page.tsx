"use client";

import ClothesCRUD from "@/app/components/project/styling/ClothesCRUD";
import ClothesTree from "@/app/components/project/styling/ClothesTree";
import IClothesType from "@/app/interfaces/IClothes";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import * as React from "react";

export default function projectPage() {
  const [seletedType, setSelectedType] = React.useState<string>("Type");
  const [item, setItem] = React.useState<string>("");
  const [type, setType] = React.useState<IClothesType[]>([]);

  const getType = async () => {
    await axios
      .get("http://localhost:6974/projects/styling/gettype")
      .then((resp: any) => {
        setType(resp.data);
      });
  };

  React.useEffect(() => {
    getType();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={9} item>
        <Box
          border={1}
          borderColor="lightgray"
          borderRadius={2}
          height="100%"
          width="100%"
          sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
        >
          <Grid>
            <ClothesTree
              type={type}
              setSelectedType={setSelectedType}
              setItem={setItem}
            />
            <ClothesCRUD
              type={type}
              seletedType={seletedType}
              item={item}
              setSelectedType={setSelectedType}
              setItem={setItem}
            />
          </Grid>
        </Box>
      </Grid>
      <Grid sm={7} xs={9} item>
        <Box
          border={1}
          borderColor="lightgray"
          borderRadius={2}
          height="100%"
          width="100%"
          sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
        ></Box>
      </Grid>
      <Grid sm={1} item></Grid>
    </Grid>
  );
}
