"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import axios from "axios";
import ISkillStack from "../interfaces/ISkillStack";
import { Chip } from "../components/custom/customComponent";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Test() {
  const [skillStackList, setSkillStackList] = React.useState<ISkillStack[]>([]);
  const [skillStackType, setSkillStackType] = React.useState<string[]>([]);
  const [selectedSkill, setSelectedSKill] = React.useState<string[]>([]);

  const getSkillStackList = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/getskillstacklist")
      .then((resp: any) => {
        setSkillStackList(resp.data);
      });
  };

  const getSkillStackType = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/getskillstacktype")
      .then((resp: any) => {
        setSkillStackType(resp.data);
      });
  };

  React.useEffect(() => {
    getSkillStackType();
    getSkillStackList();
  }, []);

  const SkillMenu = (props: { type: string }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (name: string) => {
      setSelectedSKill([...selectedSkill, name]);
      setAnchorEl(null);
    };
    return (
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {props.type}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {skillStackList.map((skillStack) => {
            if (skillStack.type === props.type) {
              return (
                <MenuItem
                  onClick={() => {
                    handleClose(skillStack.name);
                  }}
                  key={skillStack.id}
                >
                  {skillStack.name}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "true" }}>
        {skillStackType.map((type, index) => {
          return <SkillMenu type={type} key={index} />;
        })}
        <Button
          id="basic-button"
          aria-haspopup="true"
          onClick={() => {
            setSelectedSKill([]);
          }}
          sx={{ color: "red" }}
        >
          Reset
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "true" }}>
        {selectedSkill.map((skill, index) => {
          return (
            <Chip key={index}>
              #{skill}
              <RemoveIcon />
            </Chip>
          );
        })}
      </Box>
    </>
  );
}
