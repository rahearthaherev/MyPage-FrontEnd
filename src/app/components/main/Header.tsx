import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "64px",
        borderBottom: "1px solid white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderLink>Home</HeaderLink>
      <HeaderLink>About</HeaderLink>
      <HeaderLink>Skill</HeaderLink>
      <HeaderLink>Projects</HeaderLink>
      <HeaderLink>Contact</HeaderLink>
    </Box>
  );
}

function HeaderLink({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button
      sx={{
        textDecoration: "none",
        "&:hover": {},
        height: "64px",
      }}
      onClick={() => {
        router.push("/#" + children?.toString());
        router.refresh();
      }}
    >
      <Typography
        sx={{
          margin: "40px",
          fontSize: "20px",
          fontWeight: "700",
          color: "white",
          textShadow: "2px 2px 4px rgba(150, 204, 255, 0.8)",
          "@media (max-width: 900px)": {
            display: "none",
          },
        }}
      >
        {children}
      </Typography>
    </Button>
  );
}
