import { Box } from "@mui/material";
import DropIcon from "@mui/icons-material/Opacity";

const FuelIcon = ({ color }) => (
  <Box
    sx={{
      backgroundColor: color,
      borderRadius: "50%",
      width: 44,
      height: 44,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mr: 1.5,
      mb: 0.6,
    }}
  >
    <DropIcon style={{ color: "white" }} />
  </Box>
);

export default FuelIcon;
