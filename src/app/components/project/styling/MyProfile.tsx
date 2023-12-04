import IMyProfileProps from "@/app/interfaces/IMyProfileProps";
import IPersonalInfo from "@/app/interfaces/IPersonalInfo";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import styled from "styled-components";

export default function MyProfile(props: IMyProfileProps) {
  const [isEditable, setIsEditable] = React.useState(false);
  const { personalInfo, setPersonalInfo } = props;

  const getPersonalInfo = async () => {
    await axios
      .get("http://192.168.100.90:7000/projects/styling/getpersonalinfo")
      .then((resp) => {
        setPersonalInfo(resp.data);
      });
  };

  const updatePersonalInfo = async () => {
    if (isEditable) {
      await axios.post(
        "http://192.168.100.90:7000/projects/styling/updatepersonalinfo",
        personalInfo
      );
    }
    setIsEditable(!isEditable);
  };

  React.useEffect(() => {
    getPersonalInfo();
  }, []);
  return (
    <>
      <Typography variant="h5" margin={1}>
        My Profile
      </Typography>
      <Box display="flex">
        <Box display="inline" sx={{ width: "33%", padding: "15px" }}>
          <Typography fontSize="20px">身長</Typography>
          {isEditable ? (
            <TextField
              id="standard-number"
              value={personalInfo.height}
              type="number"
              variant="standard"
              inputProps={{
                step: 0.1,
                min: 0,
              }}
              onChange={(e: any) => {
                setPersonalInfo({
                  height: e.target.value,
                  bodyType: personalInfo.bodyType,
                  gender: personalInfo.gender,
                });
              }}
            />
          ) : (
            <Typography>{personalInfo.height}</Typography>
          )}
        </Box>
        <Box display="inline" sx={{ width: "33%", padding: "15px" }}>
          <Typography fontSize="20px">体系</Typography>
          {isEditable ? (
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={personalInfo.bodyType}
                onChange={(e: any) => {
                  setPersonalInfo({
                    height: personalInfo.height,
                    bodyType: e.target.value,
                    gender: personalInfo.gender,
                  });
                }}
              >
                <MenuItem value="細い">細い</MenuItem>
                <MenuItem value="普通">普通</MenuItem>
                <MenuItem value="ぽっちゃり">ぽっちゃり</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography> {personalInfo.bodyType}</Typography>
          )}
        </Box>
        <Box display="inline" sx={{ width: "33%", padding: "15px" }}>
          <Typography fontSize="20px">性別</Typography>
          {isEditable ? (
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={personalInfo.gender}
                onChange={(e: any) => {
                  setPersonalInfo({
                    height: personalInfo.height,
                    bodyType: personalInfo.bodyType,
                    gender: e.target.value,
                  });
                }}
              >
                <MenuItem value="男性">男性</MenuItem>
                <MenuItem value="女性">女性</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography> {personalInfo.gender}</Typography>
          )}
        </Box>

        <Button
          variant="contained"
          sx={{ maxHeight: "40px", marginTop: "auto", marginBottom: "15px" }}
          onClick={updatePersonalInfo}
        >
          {isEditable ? "Submit" : "Modify"}
        </Button>
      </Box>
    </>
  );
}

const InfoText = styled.div`
  padding-left: 15px;
  border: 0;
  line-height: 100%;
`;
