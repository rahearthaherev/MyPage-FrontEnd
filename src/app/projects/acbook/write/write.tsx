import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {
  Button,
  ButtonGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import IAccountBookItem from "@/app/interfaces/IAccountBookItem";
import axios from "axios";
import IAccountBookList from "@/app/interfaces/IAccountBookList";

const defalutItem: IAccountBookItem = {
  category: "食費",
  amount: 0,
  description: "",
  tax: 0,
};

export default function WriteForm(props: { date: Date; type?: string }) {
  const [title, setTitle] = React.useState(" ");
  const [selectedType, setSelectedType] = React.useState("支出");
  const [selectedPayment, setSelectedPayment] = React.useState("通帳");
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const count = React.useRef(0);
  const [rerenderingFlag, setRerenderingFlag] = React.useState(true);
  const [from, setFrom] = React.useState("現金");
  const [to, setTo] = React.useState("SBJ銀行");
  const [movingValue, setMovingValue] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [acBookList, setAcBookList] = React.useState<IAccountBookItem[]>([
    {
      category: "食費",
      amount: 0,
      tax: 0,
      description: "",
    },
  ]);

  function handleTitle(e: any) {
    setTitle(e.target.value);
  }

  function handleType(e: any) {
    setSelectedType(e.target.value);
    if (acBookList.length == 0) {
      return;
    }
    if (e.target.value == "支出") {
      acBookList[0].category = "食費";
      setRerenderingFlag(!rerenderingFlag);
    } else if (e.target.value == "輸入") {
      acBookList[0].category = "給与";
      setRerenderingFlag(!rerenderingFlag);
    }
  }

  function handlePayment(e: any) {
    setSelectedPayment(e.target.value);
    setSelectedAccount("");
  }

  function handleAccount(e: any) {
    setSelectedAccount(e.target.value);
  }

  function handleCategory(e: any) {
    const index = e.target.name;
    acBookList[index].category = e.target.value;
    setRerenderingFlag(!rerenderingFlag);
  }

  function handleDescription(e: any) {
    const index = e.target.id;
    acBookList[index].description = e.target.value;
    setRerenderingFlag(!rerenderingFlag);
  }

  function handleTax(e: any) {
    const index = e.target.name;
    acBookList[index].tax = e.target.value;

    setRerenderingFlag(!rerenderingFlag);
  }

  function handleFrom(e: any) {
    setFrom(e.target.value);
  }

  function handleTo(e: any) {
    setTo(e.target.value);
  }

  function HandleMovingValue(e: any) {
    setMovingValue(e.target.value);
  }

  function handleAmount(e: any) {
    let total: number = 0;
    const index = e.target.id;
    const value = e.target.value.replace(/\D/g, "");
    acBookList[index].amount = value;
    acBookList.map((detail, index) => {
      total = Number(total) + Number(detail.amount);
    });
    setTotal(total);
    setRerenderingFlag(!rerenderingFlag);
  }

  function handlePlusButton() {
    const newItem: IAccountBookItem = { ...defalutItem };
    acBookList.push(newItem);
    count.current++;
    setRerenderingFlag(!rerenderingFlag);
  }

  function handleMinusButton() {
    acBookList.pop();
    count.current++;
    setRerenderingFlag(!rerenderingFlag);
  }

  function handleReset() {
    setAcBookList([]);
    setTitle(" ");
    setTotal(0);
    setMovingValue(0);
  }

  function handleSubmit() {
    const item: IAccountBookList = {
      date: props.date,
      type: selectedType,
      payment: selectedPayment,
      account: selectedAccount,
      beforeAccount: from,
      afterAccount: to,
      title: title,
      details: acBookList,
      amount: movingValue,
    };
    if (selectedType == "支出" || selectedType == "輸入") {
      axios.post(
        process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/write",
        item
      );
    } else {
      axios.post(
        process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/acbook/save",
        item
      );
    }
    handleReset();
  }

  React.useEffect(() => {}, []);
  return (
    <Grid container padding="10px" spacing={2}>
      <Grid item xs={6}>
        <FormControl
          variant="standard"
          sx={{ marginBottom: "20px", marginTop: "3px", paddingRight: "30px" }}
          fullWidth
        >
          <InputLabel sx={{ fontSize: "23px" }}>Title</InputLabel>
          <Input
            id="component-simple"
            value={title}
            autoFocus
            onChange={handleTitle}
          />
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
        {selectedType == "支出" || selectedType == "輸入" ? (
          <>
            <FormControl sx={{ marginBottom: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Payment
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedPayment}
                onChange={handlePayment}
              >
                <FormControlLabel
                  value="通帳"
                  control={<Radio />}
                  label="通帳"
                />
                <FormControlLabel
                  value="現金"
                  control={<Radio />}
                  label="現金"
                />
                <FormControlLabel
                  value="クレジット"
                  control={<Radio />}
                  label="クレジット"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl sx={{ marginBottom: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Account
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedAccount}
                onChange={handleAccount}
              >
                {selectedPayment == "現金" ? (
                  <FormControlLabel
                    value="現金"
                    control={<Radio />}
                    label="現金"
                  />
                ) : selectedPayment == "クレジット" ? (
                  <FormControlLabel
                    value="クレジット"
                    control={<Radio />}
                    label="クレジット"
                  />
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
          </>
        ) : (
          <>
            <FormControl sx={{ marginBottom: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                From
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={from}
                onChange={handleFrom}
              >
                <FormControlLabel
                  value="現金"
                  control={<Radio />}
                  label="現金"
                />
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
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl sx={{ marginBottom: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">To</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={to}
                onChange={handleTo}
              >
                <FormControlLabel
                  value="現金"
                  control={<Radio />}
                  label="現金"
                />
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
              </RadioGroup>
            </FormControl>
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {selectedType == "支出" || selectedType == "輸入" ? (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {acBookList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell width={80}>
                        {selectedType == "支出" ? (
                          <>
                            <Select
                              variant="standard"
                              id={index.toString()}
                              label="Category"
                              value={item.category}
                              disableUnderline
                              onChange={handleCategory}
                              sx={{ width: 80 }}
                              name={index.toString()}
                            >
                              <MenuItem value="食費">食費</MenuItem>
                              <MenuItem value="保険">保険</MenuItem>
                              <MenuItem value="ネコ">ネコ</MenuItem>
                              <MenuItem value="趣味">趣味</MenuItem>
                              <MenuItem value="住居">住居</MenuItem>
                              <MenuItem value="通信">通信</MenuItem>
                              <MenuItem value="日用">日用</MenuItem>
                              <MenuItem value="交通">交通</MenuItem>
                              <MenuItem value="衣類">衣類</MenuItem>
                              <MenuItem value="文化">文化</MenuItem>
                              <MenuItem value="美容">美容</MenuItem>
                              <MenuItem value="医療">医療</MenuItem>
                              <MenuItem value="その他">その他</MenuItem>
                            </Select>
                          </>
                        ) : (
                          <>
                            <Select
                              variant="standard"
                              id={index.toString()}
                              label="Category"
                              value={item.category}
                              disableUnderline
                              onChange={handleCategory}
                              sx={{ width: 80 }}
                              name={index.toString()}
                            >
                              <MenuItem value="給与">給与</MenuItem>
                              <MenuItem value="その他">その他</MenuItem>
                            </Select>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          id={index.toString()}
                          value={item.description}
                          InputProps={{ disableUnderline: true }}
                          variant="standard"
                          onChange={handleDescription}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          id={index.toString()}
                          variant="standard"
                          label="Tax"
                          defaultValue={item.tax}
                          disableUnderline
                          onChange={handleTax}
                          sx={{ width: 60 }}
                          name={index.toString()}
                        >
                          <MenuItem value="0">税込</MenuItem>
                          <MenuItem value="8">8%</MenuItem>
                          <MenuItem value="10">10%</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right" width={100}>
                        <TextField
                          id={index.toString()}
                          value={item.amount + "円"}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          inputProps={{
                            style: { textAlign: "right" },
                          }}
                          variant="standard"
                          fullWidth
                          onChange={handleAmount}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <ButtonGroup>
                      <AddBoxOutlinedIcon
                        fontSize="small"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={handlePlusButton}
                      />
                      <IndeterminateCheckBoxOutlinedIcon
                        fontSize="small"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={handleMinusButton}
                      />
                    </ButtonGroup>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Total : {total}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          <TextField
            label="Amount(￥)"
            value={movingValue}
            inputProps={{
              style: { textAlign: "right" },
            }}
            variant="standard"
            onChange={HandleMovingValue}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="right">
          <ButtonGroup>
            {props.type != "modify" ? (
              <Button variant="outlined" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleSubmit}>
                Modify
              </Button>
            )}
            <Button variant="outlined" color="error" onClick={handleReset}>
              Reset
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
}
