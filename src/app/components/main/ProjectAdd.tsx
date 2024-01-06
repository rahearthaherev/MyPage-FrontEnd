import IMainProject from "@/app/interfaces/IMainProject";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { ClickableChip } from "../custom/customComponent";
import IMainProjectSkill from "@/app/interfaces/IMainProjectSkill";

export default function ProjectAddModal(props: {
  type: string;
  open: boolean;
  setOpen: () => void;
  project?: IMainProject;
  skill?: IMainProjectSkill[];
}) {
  const { open, setOpen } = props;

  const [projectName, setProjectName] = React.useState(" ");
  const [startDate, setStartDate] = React.useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = React.useState(
    new Date().toISOString().substr(0, 10)
  );
  const [teamNumber, setTeamNumber] = React.useState(1);
  const [startProcess, setStartProcess] = React.useState("基本設計");
  const [endProcess, setEndProcess] = React.useState("基本設計");
  const [description, setDescription] = React.useState(" ");

  const [skillStack, setSkillStack] = React.useState<string[]>([]);

  const selectedSkillStack = React.useRef<string[]>([]);

  const addSkillStack = (skill: string) => {
    selectedSkillStack.current.push(skill);
    console.log(selectedSkillStack.current);
  };

  const removeSkillStack = (remove: string) => {
    selectedSkillStack.current = selectedSkillStack.current.filter(
      (skill) => skill !== remove
    );
    console.log(selectedSkillStack.current);
  };

  const getSkillStack = async () => {
    axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/getskillstackname")
      .then((resp) => {
        setSkillStack(resp.data);
      });
  };

  const addProject = async () => {
    const project: IMainProject = {
      index: 0,
      projectId: "",
      projectName: projectName,
      startDate: startDate,
      endDate: endDate,
      description: description,
      teamNumber: teamNumber,
      startProcess: startProcess,
      endProcess: endProcess,
    };
    if (process.env.NEXT_PUBLIC_SPRING_SERVER) {
      //await axios.post(process.env.NEXT_PUBLIC_SPRING_SERVER, project);
    }
    setOpen();
  };

  React.useEffect(() => {
    if (props.type === "Modify") {
      const project = props.project;
      const skills = props.skill?.filter(
        (skill) => skill.projectId === project?.projectId
      );
      selectedSkillStack.current = skills?.map((skill) => skill.skillName)!;
      setProjectName(project?.projectName!);
      setStartDate(project?.startDate.toString().substr(0, 10)!);
      if (project?.endDate) {
        setEndDate(project?.endDate.toString().substr(0, 10));
      }
      setTeamNumber(project?.teamNumber!);
      setStartProcess(project?.startProcess!);
      setEndProcess(project?.endProcess!);
      setDescription(project?.description!);
    }
  }, [props]);

  React.useEffect(() => {
    getSkillStack();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={setOpen}>
        <DialogTitle>Project {props.type}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              margin="dense"
              id="name"
              label="Project Name"
              type="text"
              variant="standard"
              value={projectName}
              onChange={(e: any) => {
                setProjectName(e.target.value);
              }}
              sx={{ margin: "10px", width: "120px" }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Start Date"
              type="date"
              variant="standard"
              value={startDate}
              onChange={(e: any) => {
                setStartDate(e.target.value);
              }}
              sx={{ margin: "10px", width: "120px" }}
            />
            <TextField
              margin="dense"
              id="name"
              label="End Date"
              type="date"
              variant="standard"
              value={endDate}
              onChange={(e: any) => {
                setEndDate(e.target.value);
              }}
              sx={{ margin: "10px", width: "120px" }}
            />
          </Box>
          <Box>
            <TextField
              margin="dense"
              id="name"
              label="Team num"
              type="number"
              variant="standard"
              value={teamNumber}
              onChange={(e: any) => {
                const num = e.target.value;
                if (num < 1) {
                  setTeamNumber(1);
                } else {
                  setTeamNumber(num);
                }
              }}
              sx={{ margin: "10px", width: "120px" }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="start-process">Start Process</InputLabel>
              <Select
                labelId="start-process"
                id="demo-simple-select-standard"
                value={startProcess}
                onChange={(e: any) => {
                  setStartProcess(e.target.value);
                }}
                label="Start Process"
                sx={{ width: "122px" }}
              >
                <MenuItem value="基本設計">基本設計</MenuItem>
                <MenuItem value="詳細設計">詳細設計</MenuItem>
                <MenuItem value="製造">製造</MenuItem>
                <MenuItem value="UT">UT</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="ST">ST</MenuItem>
                <MenuItem value="リリース">リリース</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="end-process">End Process</InputLabel>
              <Select
                labelId="end-process"
                id="demo-simple-select-standard"
                value={endProcess}
                onChange={(e: any) => {
                  setEndProcess(e.target.value);
                }}
                label="End Process"
                sx={{ width: "122px" }}
              >
                <MenuItem value="基本設計">基本設計</MenuItem>
                <MenuItem value="詳細設計">詳細設計</MenuItem>
                <MenuItem value="製造">製造</MenuItem>
                <MenuItem value="UT">UT</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="ST">ST</MenuItem>
                <MenuItem value="リリース">リリース</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
              fullWidth
            />
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            {skillStack.map((skill: string, index) => {
              return (
                <ClickableChip
                  key={index}
                  skill={skill}
                  selected={
                    selectedSkillStack.current.includes(skill) ? true : false
                  }
                  addSkill={() => {
                    addSkillStack(skill);
                  }}
                  removeSkill={() => {
                    removeSkillStack(skill);
                  }}
                />
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addProject}>ADD</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
