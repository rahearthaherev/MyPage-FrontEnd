import { Box, Button } from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import IBoard from "@/app/interfaces/IBoard";
import { useRouter } from "next/navigation";
import { BoardAtom } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";

interface Column {
  id: "index" | "title" | "author" | "create_time" | "modified_time";
  label: string;
  minWidth?: number;
  width?: number;
  align?: "right" | "left" | "center";
  fontSize?: number;
}

const columns: Column[] = [
  { id: "index", label: "Index", width: 20, align: "center" },
  { id: "title", label: "Title", minWidth: 200 },
  {
    id: "author",
    label: "Author",
    width: 20,
    align: "center",
  },
  {
    id: "create_time",
    label: "Created Time",
    width: 100,
    align: "center",
    fontSize: 10,
  },
  {
    id: "modified_time",
    label: "Modified Time",
    width: 100,
    align: "center",
    fontSize: 10,
  },
];

export default function BoardMain() {
  const [page, setPage] = React.useState(0);
  const [boardList, setBoardList] = React.useState<IBoard[]>([]);
  const router = useRouter();
  const rowsPerPage: number = 15;
  const time = React.useRef("");
  const boardRecoil = useRecoilValue(BoardAtom);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleWriteButton = (url: string) => {
    router.push(url);
  };
  const handleInPage = (key: string) => {
    router.push(`/board/${key}`);
  };
  const getBoard = async () => {
    await axios
      .post("http://192.168.100.90:7000/board/list", {
        menu_sub_key: boardRecoil.menu_sub_key,
        search: "",
      })
      .then((resp) => {
        setBoardList(resp.data);
      });
  };

  React.useEffect(() => {
    getBoard();
  }, [boardRecoil]);

  return (
    <Box
      sx={{
        width: { lg: "1080px", xs: "100vh" },
        paddingTop: "70px",
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow style={{ height: "50px" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {boardList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: IBoard, index) => {
                  const url = "/board/" + row.board_key!;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.board_key}
                      style={{ height: "51px" }}
                    >
                      {columns.map((column) => {
                        switch (column.id) {
                          case "index":
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {boardList.length - index - rowsPerPage * page}
                              </TableCell>
                            );
                          case "title":
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  handleInPage(
                                    String(row.board_key!).padStart(5, "0")
                                  );
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {row.title}
                              </TableCell>
                            );
                          case "author":
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {row.author}
                              </TableCell>
                            );
                          case "create_time":
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ fontSize: column.fontSize }}
                              >
                                {row.create_time?.split(".")[0].split("T")[0]}{" "}
                                {row.create_time?.split(".")[0].split("T")[1]}
                              </TableCell>
                            );
                          case "modified_time":
                            if (row.modified_time == null) {
                              time.current = "";
                            } else {
                              time.current =
                                row.modified_time.split(".")[0].split("T")[0] +
                                " " +
                                row.modified_time?.split(".")[0].split("T")[1];
                            }
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ fontSize: column.fontSize }}
                              >
                                {time.current}
                              </TableCell>
                            );
                          default:
                            return <></>;
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex" }}>
          <InputBase
            sx={{ ml: 1, flex: 2 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <TablePagination
            rowsPerPageOptions={[0]}
            component="div"
            count={boardList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            sx={{ width: "200px", float: "right", flex: 7 }}
          />
          <Box
            sx={{ float: "right", flex: 1, display: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                handleWriteButton("/board/write");
              }}
            >
              Write
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

function setRow() {}
