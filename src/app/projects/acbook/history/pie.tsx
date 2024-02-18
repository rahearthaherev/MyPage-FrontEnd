import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

export default function PieGraph() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={600}
        height={400}
      />
    </Box>
  );
}
