import {
  Box,
  CircularProgress,
  Badge,
  Stack,
  Avatar,
  Button,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { FaUserCheck } from "react-icons/fa";
import blue from "@mui/material/colors/blue";
import { useParams } from "react-router-dom";
import { useProfileHeaderServices } from "./profileHeader.services";

interface ProfileHeaderProps {
  postCount?: number;
}

const ProfileHeader = ({ postCount }: ProfileHeaderProps) => {
  const { username } = useParams();
  const {
    auth: { user },
  } = useAuth();

  const { data, handleChange, followUserMutate, uploading } =
    useProfileHeaderServices();

  return (
    <Stack
      direction={{ sm: "row" }}
      alignItems={{ xs: "center", sm: "start" }}
      justifyContent="center"
      sx={{
        gap: { xs: 2, sm: 5 },
      }}
      paddingX={{ xs: "0.5rem", sm: "10%" }}
    >
      <Badge
        badgeContent={
          <IconButton
            sx={{
              background: "rgb(252,252,252)",
              "&:hover": {
                background: "rgba(252,252,252, 0.75)",
              },
              display: username !== user?.username ? "none" : "block",
            }}
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleChange}
            />
            <PhotoCamera />
          </IconButton>
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
      >
        <Avatar
          src={data?.user?.image!}
          alt={data?.user?.username.toUpperCase()}
          sx={{
            width: "10rem",
            height: "10rem",
          }}
        />
      </Badge>
      <Stack spacing={2}>
        <Stack gap={[1, 4]} alignItems="center" direction={{ sm: "row" }}>
          <Typography variant="h2" sx={{ fontSize: "1.2rem", fontWeight: 450 }}>
            {data?.user?.username}
          </Typography>

          {data && user?.username !== data.user?.username && (
            <Stack direction="row" spacing={1}>
              {data.user?.followers.includes(user!.username) ? (
                <Tooltip placement="top-end" arrow title="unfollow">
                  <IconButton
                    onClick={() =>
                      followUserMutate({
                        followedUsername: data?.user!.username,
                      })
                    }
                  >
                    <FaUserCheck color={blue[500]} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={() =>
                    followUserMutate({ followedUsername: data?.user!.username })
                  }
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  Follow
                </Button>
              )}

              <Button variant="outlined" size="small">
                Message
              </Button>
            </Stack>
          )}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={{ xs: "center", sm: "start" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography
            align="center"
            variant="body2"
            fontWeight={450}
            fontSize="0.85rem"
          >
            {postCount} captures
          </Typography>
          <Typography
            align="center"
            variant="body2"
            fontWeight={450}
            fontSize="0.85rem"
          >
            {data?.user?.following.length ?? 0} following
          </Typography>
          <Typography
            align="center"
            variant="body2"
            fontWeight={450}
            fontSize="0.85rem"
          >
            {data?.user?.followers.length ?? 0} followers
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body1" fontWeight={500} fontSize="1rem">
            {data?.user?.username}
          </Typography>
          <Typography variant="body2" fontSize="0.85rem">
            {data?.user?.bio}
          </Typography>
          <Typography variant="body2" fontSize="0.8rem">
            {data?.user && data.user.followers.length > 0
              ? `
              followed by ${data.user.followers[0]}
            `
              : "no followers :("}
          </Typography>
        </Stack>
      </Stack>

      {uploading && (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.15)",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default ProfileHeader;
