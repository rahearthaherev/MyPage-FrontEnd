import { HeadText, Text } from "../custom/customComponent";
import { Grid } from "@mui/material";
import * as React from "react";
export default function Home() {
  return (
    <Grid container>
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
    </Grid>
  );
}
