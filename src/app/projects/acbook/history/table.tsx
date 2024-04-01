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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ConfirmationMessage from "@/app/components/common/ConfirmationMessage";
import axios from "axios";

const test: IAccountBookList = {
  key: "test",
  date: new Date(),
  type: "支出",
  payment: "通帳",
  account: "三菱UFJ",
  title: "Test",
  details: [
    {
      key: "test",
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

function deleteTag(key: string) {}

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
  const [confirmMsgOpen, setConfirmMsgOpen] = React.useState(false);
  const sum = React.useRef<number>(0);
  const seletedTag = React.useRef<IAccountBookItem>();

  function handleConfirmMsg() {
    setConfirmMsgOpen(!confirmMsgOpen);
  }
  function handleDeleteTac() {
    axios.delete("");
  }
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
                  <TableCell>{list.account}</TableCell>
                  <TableCell>{list.type}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center" sx={{ lineHeight: "10px" }}>
                    <AddBoxOutlinedIcon
                      fontSize="small"
                      onClick={handleConfirmMsg}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    />
                    <IndeterminateCheckBoxOutlinedIcon
                      fontSize="small"
                      onClick={handleConfirmMsg}
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
                  sum.current = sum.current + detail.amount;
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
              <TableCell>Sum : </TableCell>
              <TableCell align="right">円</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmationMessage
        func={() => {
          handleDeleteTac();
        }}
        open={confirmMsgOpen}
        setOpen={() => {
          handleConfirmMsg();
        }}
        msg="Do you want to delete it?"
      />
    </>
  );
}
