import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import IAccountBookList from "@/app/interfaces/IAccountBookList";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HistoryTable(props: {
  yearHistory: IAccountBookList[];
  monthHistory: IAccountBookList[];
  dateHistory: IAccountBookList[];
  category: string;
  getHisgory: () => void;
}) {
  const [history, setHistory] = React.useState<IAccountBookList[]>();
  const sum = React.useRef<number>(0);
  const router = useRouter();

  function handleDeleteButton(e: any) {
    const key = e.target.id;

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
                    <AddBoxOutlinedIcon
                      fontSize="small"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    />
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
                    align="right"
                    sx={{ fontSize: "10px", color: "grey" }}
                  ></TableCell>
                  <TableCell
                    align="right"
                    colSpan={3}
                    sx={{ fontSize: "10px", color: "grey" }}
                  >
                    税込 : {total0} | 8%税込 : {Math.floor(total8 * 1.08)}円 |
                    10%税込 :{Math.floor(total10 * 1.1)}円 | Total :
                    {list.amount}円
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
    </>
  );
}
