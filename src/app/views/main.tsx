import { Box } from "@mui/material"
import SideVar from "./sidevar"
import BoarderVar from "./boardervar"

export default function Main({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Box  sx={{ display: 'flex' }}>
        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
}