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
import IAccountBookList from "@/app/interfaces/IAccountBookList";

export default function Statistics(props: {
  yearHistory: IAccountBookList[];
  monthHistory: IAccountBookList[];
  dateHistory: IAccountBookList[];
  category: string;
  date: Date;
}) {
  const [data, setData] = React.useState<
    { id: number; value: number; label: string }[]
  >([]);

  const [detailList, setDetailList] = React.useState<
    { date: Date; description: string; amount: number }[]
  >([]);

  function handleDetails(e: any) {
    console.log(e);
    if (props.category == "Day") {
      setDetailList(classificationList(props.dateHistory, e.target.value));
    } else if (props.category == "Month") {
      setDetailList(classificationList(props.monthHistory, e.target.value));
    } else {
      setDetailList(classificationList(props.yearHistory, e.target.value));
    }
  }

  React.useEffect(() => {
    setData([]);
    if (props.category == "Day") {
      setData(classificationData(props.dateHistory));
    } else if (props.category == "Month") {
      setData(classificationData(props.monthHistory));
    } else {
      setData(classificationData(props.yearHistory));
    }
  }, [
    props.category,
    props.date,
    props.dateHistory,
    props.monthHistory,
    props.yearHistory,
  ]);
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
              data: data,
              highlightScope: { faded: "global", highlighted: "item" },
            },
          ]}
          width={500}
          height={250}
          onItemClick={handleDetails}
        />
      </Box>
      <Box textAlign="center" sx={{ marginRight: "85px", marginTop: "5px" }}>
        <Typography>Date : {formatDate(props.date)}</Typography>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell width="150px">Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailList.map((detail, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="right">
                      {formatDate(detail.date)}
                    </TableCell>
                    <TableCell>{detail.description}</TableCell>
                    <TableCell>{detail.amount}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow></TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
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
function classificationList(historyList: IAccountBookList[], type: string) {
  const result: { date: Date; description: string; amount: number }[] = [];
  historyList.map((history, index) => {
    if (history.type == "支出") {
      history.details.map((detail, index) => {
        if (detail.category == type) {
          result.push({
            date: history.date,
            description: detail.description,
            amount: detail.amount,
          });
        }
      });
    }
  });
  return result;
}

function classificationData(historyList: IAccountBookList[]) {
  const tempData = [
    { id: 1, value: 0, label: "食費" },
    { id: 2, value: 0, label: "ネコ" },
    { id: 3, value: 0, label: "趣味" },
    { id: 4, value: 0, label: "住居" },
    { id: 5, value: 0, label: "美容" },
    { id: 6, value: 0, label: "交通" },
    { id: 7, value: 0, label: "通信" },
    { id: 8, value: 0, label: "文化" },
    { id: 9, value: 0, label: "医療" },
    { id: 10, value: 0, label: "衣類" },
    { id: 11, value: 0, label: "日用" },
    { id: 12, value: 0, label: "保険" },
    { id: 13, value: 0, label: "その他" },
  ];

  historyList.map((history, index) => {
    if (history.type == "支出") {
      history.details.map((detail, index) => {
        switch (detail.category) {
          case "食費":
            tempData[0].value += detail.amount;
            break;
          case "ネコ":
            tempData[1].value += detail.amount;
            break;
          case "趣味":
            tempData[2].value += detail.amount;
            break;
          case "住居":
            tempData[3].value += detail.amount;
            break;
          case "美容":
            tempData[4].value += detail.amount;
            break;
          case "交通":
            tempData[5].value += detail.amount;
            break;
          case "通信":
            tempData[6].value += detail.amount;
            break;
          case "文化":
            tempData[7].value += detail.amount;
            break;
          case "医療":
            tempData[8].value += detail.amount;
            break;
          case "衣類":
            tempData[9].value += detail.amount;
            break;
          case "日用":
            tempData[10].value += detail.amount;
            break;
          case "保険":
            tempData[11].value += detail.amount;
            break;
          case "その他":
            tempData[12].value += detail.amount;
            break;
        }
      });
    }
  });

  const resultData = tempData.filter((data: any) => data.value !== 0);
  return resultData;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}年${month}月${day}日`;
}
