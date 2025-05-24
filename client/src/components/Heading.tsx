import { useLocation } from "react-router";
import { Box, Typography } from "@mui/material";

import { HEADING_HEIGHT } from "@/constants/index";
import { OWNER_SIDE_BAR_LIST_ONE, OWNER_SIDE_BAR_LIST_TWO } from "@/constants";

type HeadingProps = {
  lists: typeof OWNER_SIDE_BAR_LIST_TWO & typeof OWNER_SIDE_BAR_LIST_ONE;
};
const Heading = ({ lists }: HeadingProps) => {
  const location = useLocation();
  const activeRoute = lists.filter((list) => list.to === location.pathname)[0];
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        bgcolor: "white",
        pl: 4,
        borderRadius: 4,
        height: HEADING_HEIGHT,
      }}
    >
      <Typography
        color="gray"
        fontWeight="light"
        fontSize="22px"
        lineHeight={"24px"}
      >
        {activeRoute.text}
      </Typography>
    </Box>
  );
};

export default Heading;
