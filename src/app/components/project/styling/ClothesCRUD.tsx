import { IClothesItem } from "@/app/interfaces/IClothes";
import { IClothesCRUDProps } from "@/app/interfaces/IClothesProps";
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  NativeSelect,
  styled,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function ClothesCRUD(props: IClothesCRUDProps) {
  const { type, seletedType, item, setSelectedType, setItem, resetTree } =
    props;

  const selectType = (e: any) => {
    setSelectedType(e.target.value);
  };

  const AddCloth = async () => {
    const cloth: IClothesItem = {
      type: seletedType,
      name: item,
    };
    console.log(cloth);
    await axios
      .post("http://192.168.100.90:7000/projects/styling/addcloth", cloth)
      .then(() => {
        setItem("");
        resetTree();
      });
  };

  const DeleteCloth = async () => {
    const cloth: IClothesItem = {
      type: seletedType,
      name: item,
    };
    await axios
      .post("http://192.168.100.90:7000/projects/styling/deletecloth", cloth)
      .then(() => {
        resetTree();
      });
  };

  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "right" }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="demo-customized-select-native">Type</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={seletedType}
            onChange={selectType}
            input={<BootstrapInput />}
          >
            {type.map((type, index) => {
              return (
                <option key={index} value={type.type}>
                  {type.type}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="demo-customized-textbox">Item</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            value={item}
            onChange={(e: any) => {
              setItem(e.target.value);
            }}
            sx={{ width: "135px" }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: "15px" }}>
        <ButtonGroup size="small">
          <Button variant="outlined" sx={{ width: "80px" }} onClick={AddCloth}>
            Add
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "80px" }}
            onClick={DeleteCloth}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
}