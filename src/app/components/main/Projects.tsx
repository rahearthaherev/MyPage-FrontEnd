import {
  Chip,
  HeadText,
  ProjectPaper,
  SkillBox,
  Text,
} from "../custom/customComponent";
import { Grid, Box, Button, ButtonBase } from "@mui/material";
import * as React from "react";
import LeftDoubleArrowIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import LeftArrowIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import RightDoubleArrowIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import DotIcon from "@mui/icons-material/FiberManualRecordOutlined";
import TripleDotIcon from "@mui/icons-material/MoreHorizOutlined";
import axios from "axios";
import IMainProject from "@/app/interfaces/IMainProject";
import IMainProjectSkill from "@/app/interfaces/IMainProjectSkill";
import ProjectAddModal from "./ProjectAdd";
import ConfirmationMessage from "../common/ConfirmationMessage";

export default function Projects() {
  const sliderBox = React.useRef<HTMLElement>(null);
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const [projectList, setProjectList] = React.useState<IMainProject[]>([]);
  const [projectSkillList, setProjectSkillList] = React.useState<
    IMainProjectSkill[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [type, setType] = React.useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAlertOpen = () => {
    setAlertOpen(!alertOpen);
  };

  const moveLeft = (isSingle: boolean) => {
    if (sliderIndex === 0) {
      return;
    }
    if (isSingle) {
      sliderBox.current?.scrollTo({
        top: 0,
        left: (sliderIndex - 1) * 600,
        behavior: "smooth",
      });
      setSliderIndex(sliderIndex - 1);
    } else {
      sliderBox.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setSliderIndex(0);
    }
  };

  const moveRight = (isSingle: boolean) => {
    if (sliderIndex === projectList.length - 1) {
      return;
    }
    if (isSingle) {
      sliderBox.current?.scrollTo({
        top: 0,
        left: (sliderIndex + 1) * 600,
        behavior: "smooth",
      });
      setSliderIndex(sliderIndex + 1);
    } else {
      sliderBox.current?.scrollTo({
        top: 0,
        left: 600 * projectList.length - 1,
        behavior: "smooth",
      });
      setSliderIndex(projectList.length - 1);
    }
  };

  const moveTo = (index: number) => {
    sliderBox.current?.scrollTo({
      top: 0,
      left: index * 600,
      behavior: "smooth",
    });
    setSliderIndex(index);
  };

  const getProjectList = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/getprojectlist")
      .then((resp: any) => {
        setProjectList(resp.data);
      });
    await axios
      .get(process.env.NEXT_PUBLIC_SPRING_SERVER + "/getprojectskilllist")
      .then((resp: any) => {
        setProjectSkillList(resp.data);
      });
  };

  // const deleteProject = async () => {
  //   await axios.post(
  //     process.env.NEXT_PUBLIC_SPRING_SERVER + "/deleteproject",
  //     projectList[sliderIndex]
  //   );
  //   handleAlertOpen();
  //   getProjectList();
  //   moveLeft(false);
  // };

  React.useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ marginBottom: "120px", width: "100%" }}>
        <HeadText variant="h5" textAlign="center">
          Projects
        </HeadText>
        {/* <Box sx={{ textAlign: "right", paddingRight: "150px" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              setType("Add");
              handleOpen();
            }}
          >
            A
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              setType("Modify");
              handleOpen();
            }}
          >
            M
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleAlertOpen}
          >
            D
          </Button>
        </Box> */}

        <style>
          {`
            @keyframes rotate {
              from {
                transform: rotate(0deg); /* 회전 시작 각도 */
              }
              to {
                transform: rotate(360deg); /* 회전 종료 각도 */
              }
            }
            .rotate-animation {
              animation: rotate 0.5s linear infinite; /* 2초간 회전하는 애니메이션, 무한반복 */
            }
            .buttonHover{
              transition: background-color 0.3s ease;
              border-radius: 17.5px;
            }

            .buttonHover:hover{
              cursor: pointer;
              color: darkgrey;
              border-radius: 17.5px;
              background-color: rgb(230, 240, 247);
            }
          `}
        </style>
        <Box
          display="flex"
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LeftDoubleArrowIcon
            fontSize="large"
            color="action"
            className="buttonHover"
            onClick={() => {
              moveLeft(false);
            }}
          />
          <LeftArrowIcon
            fontSize="large"
            color="action"
            className="buttonHover"
            onClick={() => {
              moveLeft(true);
            }}
          />
          <Box
            display="flex"
            sx={{
              overflowX: "scroll",
              width: "600px",
              margin: "0px 15px 10px 15px",

              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              border: "3px solid lightgrey",
              borderRadius: "15px",
            }}
            ref={sliderBox}
          >
            {projectList.map((mainProject, index) => {
              const startDate: Date = new Date(mainProject.startDate);
              const startYear = startDate.getFullYear();
              const startMonth = (startDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");

              const endDate: Date = new Date(mainProject.endDate);
              const endYear = endDate.getFullYear();
              const endMonth = (endDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");

              return (
                <ProjectPaper key={mainProject.projectId}>
                  <Box
                    display="flex"
                    sx={{ marginBottom: "20px", alignItems: "center" }}
                  >
                    <Text fontWeight="600">
                      Project名：{mainProject.projectName}
                    </Text>
                    <Text sx={{ marginLeft: "auto", fontSize: "15px" }}>
                      開発期間：{startYear}.{startMonth} ~{" "}
                      {mainProject.endDate ? `${endYear}.${endMonth}` : ""}
                    </Text>
                  </Box>
                  <Box sx={{ marginBottom: "20px" }}>
                    <Text sx={{ fontWeight: "600" }}>プロジェクト内容</Text>
                    <Text sx={{ fontSize: "15px" }}>
                      {mainProject.description}
                    </Text>
                    <Box
                      display="flex"
                      sx={{ marginBottom: "20px", alignItems: "center" }}
                    >
                      <Text fontWeight="600">開発人数：</Text>
                      <Text sx={{ fontSize: "15px" }}>
                        {mainProject.teamNumber}名
                      </Text>
                      <Box
                        display="flex"
                        sx={{ marginLeft: "auto", alignItems: "center" }}
                      >
                        <Text fontWeight="600">開発工程：</Text>
                        <Text sx={{ fontSize: "15px" }}>
                          {mainProject.startProcess} ~ {mainProject.endProcess}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Text fontWeight="600">使用スキルとツール</Text>
                  <SkillBox>
                    {projectSkillList.map((mainProjectSkill, index) => {
                      if (
                        mainProject.projectId === mainProjectSkill.projectId
                      ) {
                        return (
                          <Chip key={mainProjectSkill.index}>
                            {mainProjectSkill.skillName}
                          </Chip>
                        );
                      }
                    })}
                  </SkillBox>
                </ProjectPaper>
              );
            })}
          </Box>
          <RightArrowIcon
            fontSize="large"
            color="action"
            className="buttonHover"
            onClick={() => {
              moveRight(true);
            }}
          />
          <RightDoubleArrowIcon
            fontSize="large"
            color="action"
            className="buttonHover"
            onClick={() => {
              moveRight(false);
            }}
          />
        </Box>
        <Box
          display="flex"
          sx={{
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            opacity: "1",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {projectList.map((item, index) => {
            if (index === sliderIndex) {
              return (
                <ButtonBase
                  onClick={() => {
                    moveTo(index);
                  }}
                  key={index}
                  sx={{ borderRadius: "10px" }}
                >
                  <TripleDotIcon
                    className="rotate-animation"
                    fontSize="small"
                    color="action"
                    key={index}
                  />
                </ButtonBase>
              );
            } else {
              return (
                <ButtonBase
                  onClick={() => {
                    moveTo(index);
                  }}
                  key={index}
                  sx={{ borderRadius: "10px" }}
                >
                  <DotIcon fontSize="small" color="action" key={index} />
                </ButtonBase>
              );
            }
          })}
        </Box>
      </Grid>
      {/* <ProjectAddModal
        type={type}
        open={open}
        setOpen={handleOpen}
        refresh={getProjectList}
        project={projectList[sliderIndex]}
        skill={projectSkillList}
      />
      <ConfirmationMessage
        open={alertOpen}
        setOpen={handleAlertOpen}
        func={deleteProject}
      /> */}
    </>
  );
}

/*

        


*/
