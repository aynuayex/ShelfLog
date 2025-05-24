import { Outlet } from "react-router";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
  DRAWER_WIDTH,
  OWNER_SIDE_BAR_LIST_ONE,
  OWNER_SIDE_BAR_LIST_TWO,
} from "@/constants";
import Heading from "@/components/Heading";
import Sidebar from "@/components/Sidebar";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: isMobile ? "96px" : `${DRAWER_WIDTH + 32}px`,
        mr: 2,
        gap: 2,
      }}
    >
      <Sidebar
        list1={OWNER_SIDE_BAR_LIST_ONE}
        list2={OWNER_SIDE_BAR_LIST_TWO}
      />
      <Heading
        lists={[...OWNER_SIDE_BAR_LIST_ONE, ...OWNER_SIDE_BAR_LIST_TWO]}
      />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
