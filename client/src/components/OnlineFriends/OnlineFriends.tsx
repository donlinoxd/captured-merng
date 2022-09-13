import { Box, AvatarGroup, Avatar, Typography, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const OnlineFriends = () => {
  return (
    <Box my={2}>
      <Typography fontWeight="700" color={grey[800]} variant="h6">
        Online Friends
      </Typography>
      <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
      </AvatarGroup>
    </Box>
  );
};

export default OnlineFriends;
