import {
  Drawer,
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  alpha,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";

import book3 from "@/assets/book3.png";
import {
  DRAWER_WIDTH,
  OWNER_SIDE_BAR_LIST_ONE,
  OWNER_SIDE_BAR_LIST_TWO,
} from "@/constants";
import useAuth from "@/hooks/useAuth";
import useLogOut from "@/hooks/useLogOut";

type SidebarProps = {
  list1: typeof OWNER_SIDE_BAR_LIST_ONE;
  list2: typeof OWNER_SIDE_BAR_LIST_TWO;
};

export default function Sidebar({ list1, list2 }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const logOut = useLogOut();

  const handleLogout = async () => {
    await logOut();
    navigate("/sign-in", {
      state: { message: "You have logged out of your account!" },
    });
    setAuth({
      id: "",
      email: "",
      fullName: "",
      accessToken: "",
      emailVerified: true,
    });
  };
  return (
    <Box>
      <Drawer
        sx={{
          width: isMobile ? 64 : DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? 64 : DRAWER_WIDTH,
            height: "calc(100vh - 32px)",
            boxSizing: "border-box",
            bgcolor: "#171b36",
            color: "white",
            m: 2,
            p: isMobile ? 1 : 2,
            borderRadius: 4,
            // overflow: "hidden",
            // display: "flex",
            // flexDirection: "column",
          },
        }}
        variant="permanent"
      >
        <Stack
          direction={"row"}
          spacing={2}
          mb={4}
          justifyContent={isMobile ? "center" : undefined}
        >
          <MenuOutlinedIcon sx={{ color: "white" }} />
          {!isMobile && (
            <img src={book3} alt="opened book image" width={25} height={25} />
          )}
          {!isMobile && (
            <Typography variant="subtitle1" color="#00ABFF">
              ShelfLog
            </Typography>
          )}
        </Stack>
        <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List>
            {list1.map((list) => (
              <ListItem key={list.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={list.to}
                  sx={{
                    bgcolor:
                      location.pathname === list.to ? "primary.main" : "inherit",
                    opacity: location.pathname === list.to ? 1 : "60%",
                    borderRadius: 1,
                    justifyContent: isMobile ? "center" : "flex-start",
                    minHeight: 48,
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "16.94px",
                    },
                    ":hover": {
                      bgcolor:
                        location.pathname === list.to
                          ? "primary.main"
                          : alpha(theme.palette.primary.light, 0.2),
                      opacity: "100%",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: 0,
                      justifyContent: "center",
                      mr: !isMobile ? 2 : 0,
                      transition: "margin 0.2s",
                    }}
                  >
                    {list.icon}
                  </ListItemIcon>
                  {!isMobile && (
                    <ListItemText
                      primary={list.text}
                      sx={{ ml: 0 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />
          <List>
            {list2.map((list) => (
              <ListItem key={list.text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={list.to}
                  sx={{
                    bgcolor:
                      location.pathname === list.to ? "primary.main" : "inherit",
                    opacity: location.pathname === list.to ? 1 : "60%",
                    borderRadius: 1,
                    justifyContent: isMobile ? "center" : "flex-start",
                    minHeight: 48,
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "16.94px",
                    },
                    ":hover": {
                      bgcolor:
                        location.pathname === list.to
                          ? "primary.main"
                          : alpha(theme.palette.primary.light, 0.2),
                      opacity: "100%",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: 0,
                      justifyContent: "center",
                      mr: !isMobile ? 2 : 0,
                      transition: "margin 0.2s",
                    }}
                  >
                    {list.icon}
                  </ListItemIcon>
                  {!isMobile && (
                    <ListItemText
                      primary={list.text}
                      sx={{ ml: 0 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />
        <Box sx={{ mb: isMobile ? 1 : 0, mt: isMobile ? 1 : 2 }}>
          <Button
            onClick={() => handleLogout()}
            sx={{
              textTransform: "none",
              bgcolor: alpha(theme.palette.grey[300], 0.2),
              borderRadius: 1,
              minWidth: 0,
              justifyContent: "center",
              p: isMobile ? 1 : undefined,
              width: "100%",
              ":hover": {
                bgcolor: alpha(theme.palette.grey[300], 0.5),
              },
            }}
            color="inherit"
            startIcon={<LogoutOutlinedIcon color="inherit" />}
          >
            {!isMobile && "Logout"}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
