import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useRouter } from "next/navigation";

export default function FloatingMenus() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  function handleGoToWrite() {
    router.push("/projects/acbook/write");
  }
  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 80 }}>
      <MenuOpenIcon
        fontSize="large"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ color: "rgb(25, 118, 210)" }}
      />
      <Grow in={isHovered} timeout={500}>
        <Box
          sx={{
            position: "absolute",
            bottom: -15,
            right: "100%",
            display: "flex",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              margin: "5px",
              width: "70px",
              height: "70px",
              borderRadius: "35px",
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
            onClick={handleGoToWrite}
          >
            Write
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              margin: "5px",
              width: "70px",
              height: "70px",
              borderRadius: "35px",
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
          >
            Setting
          </Button>
        </Box>
      </Grow>
    </Box>
  );
}
