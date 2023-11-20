import { Box } from "@mui/material";
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
import IMenuItem from "@/app/interfaces/IMenuItem";

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

export default function BoardMain(props: IMenuItem) {
  const [page, setPage] = React.useState(0);
  const [boardList, setBoardList] = React.useState<IBoard[]>([]);
  const rowsPerPage: number = 15;
  const time = React.useRef("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const getBoard = async () => {
    await axios
      .post("http://localhost:6974/board/list", {
        menu_sub_key: props.menu_sub_key,
        search: "",
      })
      .then((resp) => {
        setBoardList(resp.data);
      });
  };

  React.useEffect(() => {
    getBoard();
  }, [props]);

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
                      fontSize: column.fontSize,
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
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.board_key}
                      style={{ height: "52px" }}
                    >
                      {columns.map((column) => {
                        switch (column.id) {
                          case "index":
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{}}
                              >
                                {boardList.length - index}
                              </TableCell>
                            );
                          case "title":
                            return (
                              <TableCell key={column.id} align={column.align}>
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
                                {row.create_time?.split(".")[0]}
                              </TableCell>
                            );
                          case "modified_time":
                            if (
                              row.modified_time !== null &&
                              row.modified_time !== undefined
                            ) {
                              time.current = row.modified_time.split(".")[0];
                            } else {
                              time.current = "";
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
            sx={{ ml: 1, flex: 1 }}
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
            sx={{ width: "200px", float: "right", flex: 3 }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

function setRow() {}
