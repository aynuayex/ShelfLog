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
} from "@mui/material";
import book3 from "@/assets/book3.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  DRAWER_WIDTH,
  OWNER_SIDE_BAR_LIST_ONE,
  OWNER_SIDE_BAR_LIST_TWO,
} from "@/constants";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import useLogOut from "../hooks/useLogOut";
import useAuth from "@/hooks/useAuth";

type SidebarProps = {
  list1: typeof OWNER_SIDE_BAR_LIST_ONE;
  list2: typeof OWNER_SIDE_BAR_LIST_TWO;
};

export default function Sidebar({ list1, list2 }: SidebarProps) {
  const theme = useTheme();
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
    });
  };
  return (
    <Box>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            height: "calc(100vh - 32px)",
            boxSizing: "border-box",
            bgcolor: "#171b36",
            color: "white",
            m: 2,
            p: 2,
            borderRadius: 4,
          },
        }}
        variant="permanent"
      >
        <Stack direction={"row"} spacing={2} mb={4}>
          <MenuOutlinedIcon sx={{ color: "white" }} />
          <img src={book3} alt="opened book image" width={25} height={25} />
          <Typography variant="subtitle1" color="#00ABFF">
            ShelfLog
          </Typography>
        </Stack>
        <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />
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
                <ListItemIcon sx={{ color: "white" }}>{list.icon}</ListItemIcon>
                <ListItemText primary={list.text} />
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
                <ListItemIcon sx={{ color: "white" }}>{list.icon}</ListItemIcon>
                <ListItemText primary={list.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider color="#F8F8F8" sx={{ opacity: 0.4 }} />
        <Button
          onClick={() => handleLogout()}
          sx={{
            textTransform: "none",
            bgcolor: alpha(theme.palette.grey[300], 0.2),
            borderRadius: 1,
            mt: 21,
            ":hover": {
              bgcolor: alpha(theme.palette.grey[300], 0.5),
            },
          }}
          color="inherit"
          startIcon={<LogoutOutlinedIcon color="inherit" />}
        >
          Logout
        </Button>
      </Drawer>
    </Box>
  );
}
