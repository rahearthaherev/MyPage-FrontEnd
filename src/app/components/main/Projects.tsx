import {
  Chip,
  HeadText,
  ProjectPaper,
  SkillBox,
  Text,
} from "../custom/customComponent";
import { Grid, Box } from "@mui/material";
import * as React from "react";
import LeftDoubleArrowIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import LeftArrowIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import RightDoubleArrowIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import DotIcon from "@mui/icons-material/FiberManualRecordOutlined";
import TripleDotIcon from "@mui/icons-material/MoreHorizOutlined";

export default function Projects() {
  const sliderBox = React.useRef<HTMLElement>(null);
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const [projectList, setProjectList] = React.useState([1, 2, 3, 4, 5, 6]);

  const moveLeft = (isSingle: boolean) => {
    const { scrollLeft } = sliderBox.current!;
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
    const { scrollLeft } = sliderBox.current!;
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

  React.useEffect(() => {});
  return (
    <>
      <Grid item xs={12} sx={{ marginBottom: "200px", width: "100%" }}>
        <HeadText variant="h5" textAlign="center" sx={{ marginBottom: "30px" }}>
          Projects
        </HeadText>
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
              margin: "15px",
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
            <ProjectPaper>
              <Box display="flex">
                <Text fontWeight="600">FaceStamp</Text>
                <Text sx={{ marginLeft: "auto" }}>2021.03~2021.10</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  入退室管理のためにドアに取り付けるデバイスを開発.
                  ラズベリーパイ端末を利用して体温測定と顔認識を実装。
                </Text>
              </Box>
              <SkillBox>
                <Chip>Python</Chip>
                <Chip>OpenCV</Chip>
                <Chip>Linux</Chip>
                <Chip>Java</Chip>
                <Chip>OracleDB</Chip>
              </SkillBox>
            </ProjectPaper>
            <ProjectPaper>
              <Box display="flex">
                <Text fontWeight="600">Groupware</Text>
                <Text sx={{ marginLeft: "auto" }}>2021.09~2022.08</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  社内業務の電算化と生産性を高めるためのグループウェアアプリケーションを開発。
                  社内メール、電子決済などの機能を実装。
                </Text>
              </Box>
              <SkillBox>
                <Chip>Java</Chip>
                <Chip>Javascript</Chip>
                <Chip>JQuery</Chip>
                <Chip>AJax</Chip>
                <Chip>HTML</Chip>
                <Chip>CSS</Chip>
                <Chip>Spring</Chip>
                <Chip>BootStrap</Chip>
                <Chip>MyBatis</Chip>
                <Chip>OracleDB</Chip>
              </SkillBox>
            </ProjectPaper>
            <ProjectPaper>
              <Box display="flex">
                <Text fontWeight="600">Sparrow</Text>
                <Text sx={{ marginLeft: "auto" }}>2022.09~2022.11</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  社員向けユーティリティの開発。
                  スケジュール、ニュースフィード、天気情報出力機能などの機能を実装。
                </Text>
              </Box>
              <SkillBox>
                <Chip>Node.js</Chip>
                <Chip>React</Chip>
                <Chip>Javascript</Chip>
                <Chip>HTML</Chip>
                <Chip>CSS</Chip>
                <Chip>MongoDB</Chip>
              </SkillBox>
            </ProjectPaper>
            <ProjectPaper>
              <Box display="flex">
                <Text fontWeight="600">AURORA</Text>
                <Text sx={{ marginLeft: "auto" }}>2022.12~2023.11</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  市場リスク管理のための銀行内部ウェブシステム開発。
                  設計書作成と修正、データファイル処理などのAPIを実装。
                </Text>
              </Box>
              <SkillBox>
                <Chip>C#</Chip>
                <Chip>VB</Chip>
                <Chip>Javascript</Chip>
                <Chip>HTML</Chip>
                <Chip>CSS</Chip>
                <Chip>.NET Framework</Chip>
                <Chip>MS-SQL</Chip>
                <Chip>JP1</Chip>
              </SkillBox>
            </ProjectPaper>
            <ProjectPaper
              onClick={() => {}}
              sx={{
                transition: "background-color 0.3s ease",

                "&:hover": {
                  backgroundColor: "rgb(230, 230, 230)",
                  cursor: "pointer",
                },
              }}
            >
              <Box display="flex">
                <Text fontWeight="600">MyPage</Text>
                <Text sx={{ marginLeft: "auto" }}>2023.11~</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  個人プロジェクト。開発者として自分自身を紹介、そして個人な勉強を整理するためのウェブサイトを構築。
                </Text>
              </Box>
              <SkillBox>
                <Chip>Typescript</Chip>
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>Material UI</Chip>
                <Chip>Recoil</Chip>
                <Chip>Java</Chip>
                <Chip>SpringBoot</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>AWS</Chip>
                <Chip>Git</Chip>
                <Chip>Docker(予定)</Chip>
              </SkillBox>
            </ProjectPaper>
            <ProjectPaper
              onClick={() => {}}
              sx={{
                transition: "background-color 0.3s ease",

                "&:hover": {
                  backgroundColor: "rgb(230, 230, 230)",
                  cursor: "pointer",
                },
              }}
            >
              <Box display="flex">
                <Text fontWeight="600">Today&apos;s Styling</Text>
                <Text sx={{ marginLeft: "auto" }}>2023.12~</Text>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Text>
                  個人プロジェクト。気象情報とAIを利用して、スタイリングシステムを開発。
                  個人の体型、持っている服、天気情報などをAIに送信、スタイリングシステムを実装。
                </Text>
              </Box>
              <SkillBox>
                <Chip>Typescript</Chip>
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>Material UI</Chip>
                <Chip>Recoil</Chip>
                <Chip>Java</Chip>
                <Chip>SpringBoot</Chip>
                <Chip>PostgreSQL</Chip>
              </SkillBox>
            </ProjectPaper>
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
                <TripleDotIcon
                  className="rotate-animation"
                  fontSize="small"
                  color="action"
                  key={index}
                />
              );
            } else {
              return <DotIcon fontSize="small" color="action" key={index} />;
            }
          })}
        </Box>
      </Grid>
    </>
  );
}

/*

        


*/
