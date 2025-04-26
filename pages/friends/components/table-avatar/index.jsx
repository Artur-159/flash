import { Avatar, Box, Typography } from "@mui/material";
import noAvatar from "../../../../assets/icons/no-avatar.svg";

const TableAvatar = ({ first_name, last_name, id, profile_picture }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar
        alt={first_name}
        sx={{ width: 36, height: 36 }}
        src={profile_picture || noAvatar}
      />
      <Box>
        <Typography fontWeight={500}>
          {first_name} {last_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ID:{id}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableAvatar;
