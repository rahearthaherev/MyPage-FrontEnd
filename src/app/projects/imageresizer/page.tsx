"use client";

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import IImageResizer from "@/app/interfaces/IImageResizer";
import axios from "axios";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

interface ImageDimensions {
  width: number;
  height: number;
}

export default function ImageResizer() {
  const [changeType, setChangeType] = React.useState("Fixed");
  const [fileExtention, setFileExtension] = React.useState("");
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [selectedFile, setSelectedFile] = React.useState(
    "/assets/images/defaultImage.png"
  );
  const [resizedFile, setResizedFile] = React.useState("");
  const [originWidth, setOriginWidth] = React.useState<number>(0);
  const [originHeight, setOriginHeight] = React.useState<number>(0);
  const [originExtention, setOriginExtention] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [top, setTop] = React.useState<number | string>(0);
  const [left, setLeft] = React.useState<number | string>(0);

  const [open, setOpen] = React.useState(false);

  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleFileInputChange = async (event: any) => {
    if (!event) {
      return;
    }
    const file = event.target.files[0];

    if (file) {
      const filename = file.name.split(".");
      setName(filename[0]);
      setFileExtension(filename[1]);
      setOriginExtention(filename[1]);
      const dimensions = await getImageDimensions(file);
      setOriginWidth(dimensions.width);
      setOriginHeight(dimensions.height);
      setWidth(dimensions.width);
      setHeight(dimensions.height);

      const base64Image = await convertToBase64(file);
      setSelectedFile(base64Image);
    }
  };

  const handleFileReset = () => {
    setOriginWidth(0);
    setOriginHeight(0);
    setWidth(0);
    setHeight(0);
    setFileExtension("");
    handleFileInputChange(undefined);
    setSelectedFile("/assets/images/defaultImage.png");
  };

  const handleInputWidthChange = (event: any) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    if (value == "") {
      setWidth(0);
      return;
    }
    if (
      (changeType !== "Fixed" && value > originWidth) ||
      changeType === "Top" ||
      changeType === "Bottom"
    ) {
      setWidth(originWidth);
      return;
    }
    const num = parseInt(event.target.value, 10);
    setWidth(num);
  };

  const handleInputHeightChange = (event: any) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    if (value == "") {
      setHeight(0);
      return;
    }
    if (
      (changeType !== "Fixed" && value > originHeight) ||
      changeType === "Right" ||
      changeType === "Left"
    ) {
      setHeight(originHeight);
      return;
    }

    const num = parseInt(event.target.value, 10);
    setHeight(num);
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChangeType = (e: any) => {
    setChangeType(e.target.value);
    switch (e.target.value) {
      case "Fixed":
        break;
      case "Top":
        setWidth(originWidth);
        break;
      case "Bottom":
        setWidth(originWidth);
        break;
      case "Left":
        setHeight(originHeight);
        break;
      case "Right":
        setHeight(originHeight);
        break;
    }
  };

  const handleExecute = async () => {
    if (width * height === 0) {
      return;
    }
    const reImage: IImageResizer = {
      image: selectedFile.split(",")[1],
      oldWidth: originWidth,
      oldHeight: originHeight,
      newWidth: width,
      newHeight: height,
      oldExtention: originExtention,
      newExtention: fileExtention,
      fileName: name,
      type: changeType,
    };

    try {
      const resp = await axios.post(
        process.env.NEXT_PUBLIC_SPRING_SERVER + "/projects/imageresizing",
        reImage
      );
      const imageDataUrl = `data:image/${fileExtention};base64,${resp.data}`;
      setResizedFile(imageDataUrl);
      setOpen(!open);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  const getImageDimensions = (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = (error: any) => {
        reject(error);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = resizedFile;
    link.download = name + "." + fileExtention;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    const image = imageRef.current!;

    if (image) {
      const positon = image.getBoundingClientRect();
      const top = changeType == "Bottom" ? height : 0;
      setTop(top);
      setLeft(positon.left);
    }
  }, [selectedFile, width, height]);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "white" }}>
      <Box display="flex" alignItems="center">
        <Box sx={{ margin: "60px auto" }}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={changeType}
              label="Age"
              onChange={handleChangeType}
              size="small"
            >
              <MenuItem value="Fixed">Fixed Ratio</MenuItem>
              <MenuItem value="Top">Remove Top</MenuItem>
              <MenuItem value="Bottom">Remove Bottom</MenuItem>
              <MenuItem value="Left">Remove Left</MenuItem>
              <MenuItem value="Right">Remove Right</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <Select
              id="demo-simple-select-helper"
              value={fileExtention}
              onChange={(e: any) => setFileExtension(e.target.value)}
              size="small"
            >
              <MenuItem value={"png"}>png</MenuItem>
              <MenuItem value={"jpg"}>jpg</MenuItem>
              <MenuItem value={"pdf"}>pdf(未完成)</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <TextField
              id="outlined-basic"
              label="Width"
              variant="outlined"
              size="small"
              onChange={handleInputWidthChange}
              value={width}
              sx={{ width: "100px" }}
              InputProps={{
                style: {
                  textAlign: "right",
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <TextField
              id="outlined-basic"
              label="Height"
              variant="outlined"
              size="small"
              onChange={handleInputHeightChange}
              sx={{ width: "100px" }}
              value={height}
              InputProps={{
                style: {
                  textAlign: "right",
                },
              }}
            />
          </FormControl>
          <ButtonGroup sx={{ marginTop: "8px" }}>
            <Input
              type="file"
              onChange={handleFileInputChange}
              inputProps={{ accept: "image/*" }}
              style={{ display: "none", borderRadius: "5px" }}
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Select File
              </Button>
            </label>
            <Button color="error" onClick={handleExecute}>
              Execute
            </Button>
            <Button color="secondary" onClick={handleFileReset}>
              Reset
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" position="relative">
        <Image
          src={selectedFile}
          alt="Image Pre-view"
          style={{
            margin: "auto",
            border: "1px solid grey",
            position: "relative",
          }}
          width={changeType === "Fixed" ? width : originWidth}
          height={changeType === "Fixed" ? height : originHeight}
          ref={imageRef}
        />
        {changeType !== "Fixed" ? (
          <Box
            width={
              changeType == "Left" || changeType == "Right"
                ? originWidth - width
                : originWidth
            }
            height={
              changeType == "Top" || changeType == "Bottom"
                ? originHeight - height
                : originHeight
            }
            sx={{
              position: "absolute",
              textAlign: "center",
              display: "flex",
              top: { top },
              left: { left },
              backgroundColor: "rgba(255, 0, 0, 0.3)",
            }}
          >
            {((changeType == "Left" || changeType == "Right") &&
              originWidth - width !== 0) ||
            ((changeType == "Top" || changeType == "Bottom") &&
              originHeight - height !== 0) ? (
              <p style={{ margin: "auto", color: "grey" }}>削除</p>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid lightgrey",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          {resizedFile !== "" ? (
            <Image
              src={resizedFile}
              alt="resizedImage Pre-view"
              width={width}
              height={height}
              style={{ border: "1px solid grey", margin: "auto" }}
            />
          ) : (
            <></>
          )}
          <Box sx={{ marginTop: "50px" }}>
            <ButtonGroup>
              <Button
                variant="contained"
                startIcon={<CloudDownloadIcon />}
                onClick={downloadImage}
              >
                Download Image
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
