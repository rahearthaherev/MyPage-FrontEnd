import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IAccountBookItem from "@/app/interfaces/IAccountBookList";
import { TableFooter } from "@mui/material";
import IAccountBookList from "@/app/interfaces/IAccountBookList";

const test: IAccountBookList = {
  key: "test",
  date: new Date(),
  type: "支出",
  payment: "通帳",
  account: "三菱UFJ",
  title: "Test",
  items: [
    {
      itemKey: "test",
      subKey: "test",
      category: "食費",
      description: "test",
      amount: 1234,
    },
  ],
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export default function HistoryTable() {
  const [lists, setLists] = React.useState<IAccountBookItem[]>([
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
    test,
  ]);
  const sum = React.useRef<number>(0);
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          {lists?.map((list) => {
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
                  <TableCell>{list.payment}</TableCell>
                  <TableCell>{list.account}</TableCell>
                  <TableCell>{list.type}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {list.items?.map((item) => {
                  sum.current = sum.current + item.amount;
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
                      <TableCell></TableCell>
                      <TableCell align="right">{item.category}</TableCell>

                      <TableCell align="right">{item.description}</TableCell>
                      <TableCell align="right">{item.amount}円</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow></TableRow>
              </TableBody>
            );
          })}
          <TableFooter>
            <TableRow>
              <TableCell align="left">Date : </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Sum : {sum.current}円</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
