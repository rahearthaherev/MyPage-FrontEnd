"use client";

import ClothesCRUD from "@/app/components/project/styling/ClothesCRUD";
import ClothesTree from "@/app/components/project/styling/ClothesTree";
import MyProfile from "@/app/components/project/styling/MyProfile";
import WeatherInfo from "@/app/components/project/styling/WeatherInfo";
import IClothesType from "@/app/interfaces/IClothes";
import IPersonalInfo from "@/app/interfaces/IPersonalInfo";
import IStylingData from "@/app/interfaces/IStylingData";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";

export default function ProjectPage() {
  const [seletedType, setSelectedType] = React.useState<string>("Type");
  const [item, setItem] = React.useState<string>("");
  const [typeList, setTypeList] = React.useState<IClothesType[]>([]);
  const [personalInfo, setPersonalInfo] = React.useState<IPersonalInfo>({
    height: 0,
    bodyType: "",
    gender: "",
  });
  const [resetTrigger, setResetTrigger] = React.useState<boolean>(false);
  const [stylingData, setStylingData] = React.useState<
    IStylingData | undefined
  >(undefined);

  const resetTree = () => {
    setResetTrigger(!resetTrigger);
  };

  const getType = async () => {
    await axios
      .get("http://192.168.100.90:7000/projects/styling/gettype")
      .then((resp: any) => {
        setTypeList(resp.data);
      });
  };

  React.useEffect(() => {
    getType();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid sm={4} xs={9} item>
        <Grid item xs={12}>
          <Box
            border={2}
            borderColor="lightgray"
            borderRadius={2}
            height="100%"
            width="100%"
            sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
          >
            <WeatherInfo
              stylingData={stylingData}
              setStylingData={(data: IStylingData) => {
                setStylingData(data);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            border={2}
            borderColor="lightgray"
            borderRadius={2}
            height="100%"
            width="100%"
            sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
          >
            <MyProfile
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            border={2}
            borderColor="lightgray"
            borderRadius={2}
            height="100%"
            width="100%"
            sx={{ backgroundColor: "", marginLeft: "15px", padding: "15px" }}
          >
            <Grid>
              <ClothesTree
                type={typeList}
                resetTrigger={resetTrigger}
                setSelectedType={setSelectedType}
                setItem={setItem}
              />
              <ClothesCRUD
                type={typeList}
                seletedType={seletedType}
                item={item}
                setSelectedType={setSelectedType}
                setItem={setItem}
                resetTree={resetTree}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid sm={7} xs={9} item>
        <Box
          border={2}
          borderColor="lightgray"
          borderRadius={2}
          height="calc(100% - 15px)"
          width="100%"
          sx={{ backgroundColor: "", margin: "15px", padding: "15px" }}
        >
          <Typography variant="h4" margin={1}>
            Today&apos;s Styling
          </Typography>
        </Box>
      </Grid>
      <Grid sm={1} item></Grid>
    </Grid>
  );
}
