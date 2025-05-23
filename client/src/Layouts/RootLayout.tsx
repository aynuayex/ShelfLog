import { Box, CircularProgress } from "@mui/material";
import { Outlet, useNavigation } from "react-router";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <Box>
      {navigation.state === "loading" ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Outlet />
      )}
    </Box>
  );
};

export default RootLayout;
