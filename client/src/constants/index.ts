import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const DRAWER_WIDTH = 279;
export const HEADING_HEIGHT = 67;

export const OWNER_SIDE_BAR_LIST_ONE = [
    { text: "Dashboard", icon: React.createElement(DashboardOutlinedIcon), to: '/dashboard' },
    { text: "Book Upload", icon: React.createElement(LibraryBooksOutlinedIcon), to: '/book_upload' },
    { text: "Other", icon: React.createElement(AddCircleOutlineOutlinedIcon), to: '/other' },
    { text: "Other One", icon: React.createElement(AddCircleOutlineOutlinedIcon), to: '/other_one' },
    { text: "Other Two", icon: React.createElement(AddCircleOutlineOutlinedIcon), to: '/other_two' },
  ];
  
export const OWNER_SIDE_BAR_LIST_TWO = [
    { text: "Notification", icon: React.createElement(NotificationsNoneOutlinedIcon), to: '/notification' },
    { text: "Setting", icon: React.createElement(SettingsOutlinedIcon), to: '/setting' },
  ];