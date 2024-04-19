import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableFooter } from "@mui/material";
import IAccountBookList from "@/app/interfaces/IAccountBookList";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import axios from "axios";
import IAccountBookItem from "@/app/interfaces/IAccountBookItem";
import ModifyHistoryForm from "./modify";

export default function HistoryTable(props: {
  yearHistory: IAccountBookList[];
  monthHistory: IAccountBookList[];
  dateHistory: IAccountBookList[];
  category: string;
  getHisgory: () => void;
}) {
  const [history, setHistory] = React.useState<IAccountBookList[]>();
  const [selectedHistory, setSelectedHistory] =
    React.useState<IAccountBookList>();
  const [selectedDetails, setSelectedDetails] =
    React.useState<IAccountBookItem[]>();
  const [open, setOpen] = React.useState(false);
  const sum = React.useRef<number>(0);

  function handleModifyButton(
    history: IAccountBookList,
    details: IAccountBookItem[]
  ) {
    setOpen(true);
  }

  function handleDeleteButton(e: any) {
    const key = e.target.id;
    if (confirm("Do you want to delete this history?")) {
      axios
        .delete(
          process.env.NEXT_PUBLIC_SPRING_SERVER +
            "/projects/acbook/deletehistory/" +
            key
        )
        .then((resp) => {
          props.getHisgory();
        });
    }
  }

  React.useEffect(() => {
    if (props.category == "Day") {
      setHistory(props.dateHistory);
    } else if (props.category == "Month") {
      setHistory(props.monthHistory);
    } else {
      setHistory(props.yearHistory);
    }
    sum.current = 0;
  }, [
    props.category,
    props.dateHistory,
    props.monthHistory,
    props.yearHistory,
    history,
  ]);
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell width="30px">Modify</TableCell>
            </TableRow>
          </TableHead>
          {history?.map((list) => {
            if (list.type == "支出" || list.type == "貯金") {
              sum.current -= list.amount!;
            }
            let total0 = 0;
            let total8 = 0;
            let total10 = 0;
            return (
              <TableBody key={list.key}>
                <TableRow
                  key={list.key}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {list.title}
                  </TableCell>
                  <TableCell>{list.account}</TableCell>
                  <TableCell>{list.type}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center" sx={{ lineHeight: "10px" }}>
                    <IndeterminateCheckBoxOutlinedIcon
                      fontSize="small"
                      onClick={handleDeleteButton}
                      id={list.key}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
                {list.details?.map((detail) => {
                  if (detail.tax == 8) {
                    console.log("total8");
                    console.log(detail);
                    total8 += Number(detail.amount);
                    console.log(total8);
                  } else if (detail.tax == 10) {
                    total10 += Number(detail.amount);
                  } else {
                    total0 += Number(detail.amount);
                  }
                  return (
                    <TableRow
                      key={list.key}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">{detail.category}</TableCell>

                      <TableCell align="center">{detail.description}</TableCell>
                      <TableCell align="right">{detail.amount}円</TableCell>
                      <TableCell
                        align="center"
                        sx={{ lineHeight: "10px" }}
                      ></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow></TableRow>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    colSpan={4}
                    align="right"
                    sx={{ fontSize: "10px", color: "grey" }}
                  >
                    <Box display="flex" textAlign="center">
                      <Box display="inline" width="25%">
                        税込 : {total0}円
                      </Box>
                      <Box
                        display="inline"
                        width="25%"
                        borderLeft="1px solid grey"
                      >
                        8%税込 : {Math.floor(total8 * 1.08)}円
                      </Box>
                      <Box
                        display="inline"
                        width="25%"
                        borderLeft="1px solid grey"
                      >
                        10%税込 :{Math.floor(total10 * 1.1)}円
                      </Box>
                      <Box
                        display="inline"
                        width="25%"
                        borderLeft="1px solid grey"
                      >
                        Total :{list.amount}円
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
          <TableFooter>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell colSpan={2} align="right">
                Total : {sum.current}円
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ModifyHistoryForm
        history={selectedHistory!}
        details={selectedDetails!}
        open={open}
        setOpen={() => {
          setOpen(!open);
        }}
      />
    </>
  );
}
