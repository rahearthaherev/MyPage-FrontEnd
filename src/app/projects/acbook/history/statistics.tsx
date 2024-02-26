import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";

export default function Statistics() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
          height: "40vh",
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
              highlightScope: { faded: "global", highlighted: "item" },
            },
          ]}
          width={500}
          height={250}
        />
      </Box>
      <Box textAlign="center" sx={{ marginRight: "85px", marginTop: "5px" }}>
        <Typography>Date</Typography>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right" width="50px">
                  200円
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
