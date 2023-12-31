import IStylingProps from "@/app/interfaces/IStylingProps";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import * as Icon from "../../../constants/Icon";
import ClearIcon from "@mui/icons-material/WbSunnyOutlined";
import FlogIcon from "@mui/icons-material/LensBlurOutlined";
import WindIcon from "@mui/icons-material/AirOutlined";
import CloudyIcon from "@mui/icons-material/CloudOutlined";
import PartlyCloudyIcon from "@mui/icons-material/CloudCircleOutlined";
import RainIcon from "@mui/icons-material/WaterDropOutlined";
import SnowIcon from "@mui/icons-material/AcUnitOutlined";
import IStylingData from "@/app/interfaces/IStylingData";

function toIcon(value: string) {
  switch (value) {
    case Icon.Fog:
      return <FlogIcon />;
    case Icon.Wind:
      return <WindIcon />;
    case Icon.Cloudy:
      return <CloudyIcon />;
    case Icon.PartlyCloudy:
      return <PartlyCloudyIcon />;
    case Icon.Rain:
      return <RainIcon />;
    case Icon.Snow:
      return <SnowIcon />;
    default:
      return <ClearIcon />;
  }
}

export default function WeatherInfo(props: IStylingProps) {
  const getWeatherDataForStyling = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/styling/weatherinfo")
      .then((resp: any) => {
        props.setStylingData(resp.data);
        console.log(resp.data);
      });
  };
  const stylingData: IStylingData = {
    maxTemperature: props.stylingData
      ? Math.round(props.stylingData.maxTemperature * 10) / 10
      : 0,
    minTemperature: props.stylingData
      ? Math.round(props.stylingData.minTemperature * 10) / 10
      : 0,
    currentTemperature: props.stylingData
      ? Math.round(props.stylingData.currentTemperature * 10) / 10
      : 0,
    windSpeed: props.stylingData
      ? Math.round(props.stylingData.windSpeed * 10) / 10
      : 0,
    humidity: props.stylingData ? props.stylingData.humidity * 100 : 0,
    icon: props.stylingData ? props.stylingData.icon : "",
    precipProbability: props.stylingData
      ? props.stylingData.precipProbability * 100
      : 0,
  };

  React.useEffect(() => {
    getWeatherDataForStyling();
  }, []);
  return (
    <>
      <Typography variant="h5" margin={1}>
        Today&apos;s Weather
      </Typography>
      <Box display="flex" alignItems="flex-start">
        <Box display="flex" alignItems="center">
          {toIcon(stylingData.icon)}
          <Typography fontSize="20px">
            {stylingData.currentTemperature}°C
          </Typography>
        </Box>
        <Box>
          <InfoText>最高 : {stylingData.maxTemperature}</InfoText>
          <InfoText>最低 : {stylingData.minTemperature}</InfoText>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <InfoText></InfoText>
          <InfoText style={{ fontSize: "12px" }}>
            湿気 : {stylingData.humidity}%
          </InfoText>
          <InfoText style={{ fontSize: "12px" }}>
            風速 : {stylingData.windSpeed}m/s
          </InfoText>
          <InfoText style={{ fontSize: "12px" }}>
            降水確率 : {stylingData.precipProbability}%
          </InfoText>
        </Box>
      </Box>
    </>
  );
}

const InfoText = styled.div`
  padding-left: 15px;
  border: 0;
  line-height: 100%;
`;
