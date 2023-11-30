import { QuickAtom } from "@/app/recoil/atoms";
import {
  Chip,
  HeadText,
  ProjectPaper,
  SkillBox,
  Text,
} from "../custom/customComponent";
import { Grid, Box } from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";

export default function Projects() {
  return (
    <>
      <Grid item xs={12} sx={{ marginTop: "100px" }}>
        <HeadText variant="h5" textAlign="center" sx={{ margin: "30px" }}>
          Projects
        </HeadText>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            gap: 2,
          }}
        >
          <ProjectPaper elevation={3}>
            <Box display="flex">
              <Text fontWeight="600">FaceStamp</Text>
              <Text sx={{ marginLeft: "auto" }}>2021.03~2021.10</Text>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Text>
                入退室管理のためにドアに取り付けるデバイスを開発.
                ラズベリーパイ端末を利用して体温測定と顔認識を実現。
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
          <ProjectPaper elevation={3}>
            <Box display="flex">
              <Text fontWeight="600">Groupware</Text>
              <Text sx={{ marginLeft: "auto" }}>2021.11~2022.08</Text>
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
          <ProjectPaper elevation={3}>
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
          <ProjectPaper elevation={3}>
            <Box display="flex">
              <Text fontWeight="600">AURORA</Text>
              <Text sx={{ marginLeft: "auto" }}>2022.12~2023.11</Text>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Text>
                市場リスク管理のための銀行内部ウェブシステム開発。
                設計書作成と修正、データファイル処理などのAPIを実現。
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
            elevation={3}
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
              <Text sx={{ marginLeft: "auto" }}>2023.11~</Text>
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
          <ProjectPaper></ProjectPaper>
        </Box>
      </Grid>
    </>
  );
}
