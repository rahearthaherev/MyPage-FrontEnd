import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import {
  Grid,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import IAccountBookItem from "@/app/interfaces/IAccountBookItem";

export default function WriteForm() {
  const [title, setTitle] = React.useState(" ");
  const [selectedType, setSelectedType] = React.useState("支出");
  const [selectedPayment, setSelectedPayment] = React.useState("通帳");
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [acBookList, setAcBookList] = React.useState<IAccountBookItem[]>();

  function handleType(e: any) {
    setSelectedType(e.target.value);
  }

  function handlePayment(e: any) {
    setSelectedPayment(e.target.value);
  }

  function handleAccount(e: any) {
    setSelectedAccount(e.target.value);
  }

  function handleAcBookList(e: any) {
    alert(e.target.key);
    //const item: IAccountBookItem = {category: "", amount: "", description: ""}
  }

  React.useEffect(() => {
    const defalutItem: IAccountBookItem = {
      category: "食費",
      amount: 0,
      description: "",
    };
    setAcBookList([defalutItem]);
    alert(acBookList[0].category);
  }, []);
  return (
    <Grid container padding="10px" spacing={2}>
      <Grid item xs={6}>
        <FormControl
          variant="standard"
          sx={{ marginBottom: "20px", marginTop: "3px", paddingRight: "30px" }}
          fullWidth
        >
          <InputLabel sx={{ fontSize: "23px" }}>Title</InputLabel>
          <Input id="component-simple" value={title} />
        </FormControl>

        <FormControl sx={{ marginBottom: "5px" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleType}
            value={selectedType}
          >
            <FormControlLabel value="支出" control={<Radio />} label="支出" />
            <FormControlLabel value="輸入" control={<Radio />} label="輸入" />
            <FormControlLabel value="貯金" control={<Radio />} label="貯金" />
            <FormControlLabel value="移動" control={<Radio />} label="移動" />
          </RadioGroup>
        </FormControl>
        <br />
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ marginBottom: "5px" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Payment</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedPayment}
            onChange={handlePayment}
          >
            <FormControlLabel value="通帳" control={<Radio />} label="通帳" />
            <FormControlLabel value="現金" control={<Radio />} label="現金" />
            <FormControlLabel
              value="クレジット"
              control={<Radio />}
              label="クレジット"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl sx={{ marginBottom: "5px" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Account</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedAccount}
            onChange={handleAccount}
          >
            {selectedPayment == "現金" ? (
              <FormControlLabel value="現金" control={<Radio />} label="現金" />
            ) : (
              <>
                <FormControlLabel
                  value="三菱UFJ"
                  control={<Radio />}
                  label="三菱UFJ"
                />
                <FormControlLabel
                  value="SBJ銀行"
                  control={<Radio />}
                  label="SBJ銀行"
                />
              </>
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    key={count}
                    id={count.toString()}
                    value={acBookList[count].category}
                    onChange={handleAcBookList}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
