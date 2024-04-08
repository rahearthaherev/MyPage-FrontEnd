import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IAccountBookItem from "@/app/interfaces/IAccountBookList";
import { ListItem, TableFooter } from "@mui/material";
import IAccountBookList from "@/app/interfaces/IAccountBookList";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ConfirmationMessage from "@/app/components/common/ConfirmationMessage";
import axios from "axios";

export default function HistoryTable(props: {
  yearHistory: IAccountBookList[];
  monthHistory: IAccountBookList[];
  dateHistory: IAccountBookList[];
  category: string;
}) {
  const [history, setHistory] = React.useState<IAccountBookList[]>();
  const [confirmMsgOpen, setConfirmMsgOpen] = React.useState(false);
  const sum = React.useRef<number>(0);
  const seletedTag = React.useRef<IAccountBookItem>();

  function handleConfirmMsg() {
    setConfirmMsgOpen(!confirmMsgOpen);
  }
  function handleDeleteTac() {
    axios.delete("");
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  function deleteTag(key: string) {}
  React.useEffect(() => {
    if (props.category == "Day") {
      setHistory(props.dateHistory);
    } else if (props.category == "Month") {
      setHistory(props.monthHistory);
    } else {
      setHistory(props.yearHistory);
    }
    sum.current = 0;
  }, [props.category]);
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
                  <TableCell align="left">
                    {/* Date : {formatDate(list.date)} */}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "10px", color: "grey" }}
                  >
                    Sum :{" "}
                  </TableCell>
                  <TableCell
                    align="right"
                    colSpan={2}
                    sx={{ fontSize: "10px", color: "grey" }}
                  >
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
              <TableCell align="right">Sum : </TableCell>
              <TableCell colSpan={2} align="right">
                {sum.current}円
              </TableCell>
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
