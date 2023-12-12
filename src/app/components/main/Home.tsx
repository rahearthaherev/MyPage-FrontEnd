import { HeadText, Text } from "../custom/customComponent";
import { Button, Chip, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import * as React from "react";
import axios from "axios";
export default function Home() {
  const handleDownload = async () => {
    try {
      // 서버로 파일 다운로드 요청
      const response = await axios({
        method: "GET",
        url: "http://192.168.100.90:7000/download", // 실제 파일 다운로드 경로
        responseType: "blob", // 파일 다운로드를 위해 blob 형식으로 받기
      });

      // 파일 다운로드 링크 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "スキルシート＿Jeong-DaeGyun.xlsx"); // 다운로드될 파일의 이름 지정
      document.body.appendChild(link);

      // 클릭하여 파일 다운로드
      link.click();

      // 사용이 끝난 링크 및 URL 객체 정리
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // 에러 처리
      console.error("파일 다운로드 중 오류가 발생했습니다:", error);
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item sm={3} xs={12} style={{ textAlign: "center" }}>
        <img
          src="/assets/images/photo.png"
          alt="My Image"
          width="100%"
          height="100%"
          style={{
            border: "1px solid lightgray",
            borderRadius: "50%",
            maxWidth: "150px",
            maxHeight: "150px",
            minWidth: "100px",
            minHeight: "100px",
          }}
        ></img>
      </Grid>
      <Grid item sm={9} xs={12}>
        <HeadText variant="h3" style={{ textAlign: "right" }}>
          Daegyun Jeong
        </HeadText>
        <Text style={{ textAlign: "right" }}>
          - Full stack developer from japan, since 2022
        </Text>
      </Grid>
      <Grid item xs={12}>
        <Text>
          2022年にコンピューター工学を卒業し、本格的にキャリアをスタートさせました。
          2022年の冬から日系SI企業に入社し、大規模システムのバックエンド開発やサーバーの実務経験を積みました。
          <br />
          2024年からはフロントエンドにも興味を持ち、個人プロジェクトに携わりながら、フルスタックデベロッパーとしてのスキルを磨いています。
        </Text>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <LinkChip text="Skill Sheet" func={handleDownload} />
        <LinkChip
          text="GitHub"
          func={() => {
            window.open("https://github.com/rahearthaherev", "_blank");
          }}
        />
      </Grid>
    </Grid>
  );
}

function LinkChip(props: { text: string; func?: () => void }) {
  return (
    <Button
      variant="outlined"
      onClick={props.func}
      sx={{
        backgroundColor: "white",
        height: "100px",
        width: "200px",
        borderRadius: "100px",
        color: "skyblue",
        fontSize: "20px",
        margin: "50px",
        "&:hover": {
          backgroundColor: "rgb(224, 244, 255)",
          cursor: "pointer",
        },
      }}
    >
      {props.text}
      {props.text === "GitHub" ? (
        <img
          src="/assets/images/GitHubIcon.png"
          alt="github"
          style={{ width: "24px", height: "24px" }}
        ></img>
      ) : (
        <DownloadIcon />
      )}
    </Button>
  );
}
