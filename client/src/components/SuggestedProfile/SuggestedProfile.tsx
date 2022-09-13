import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  RecommendedUsersQuery,
  useFollowUserMutation,
  useRecommendedUsersQuery,
} from "../../hooks/queryHooks";
import { queryClient, reqClient } from "../../queryClient";
import { Link } from "react-router-dom";

const SuggestedProfile = () => {
  const { data } = useRecommendedUsersQuery(reqClient);
  const { mutate: followUserMutate } = useFollowUserMutation(reqClient, {
    cacheTime: 1000 * 60 * 60,
    onMutate: async ({ followedUsername }) => {
      await queryClient.cancelQueries(["recommendedUsers"]);

      const prevUsers = queryClient.getQueryData<RecommendedUsersQuery>([
        "recommendedUsers",
      ]);

      queryClient.setQueryData<RecommendedUsersQuery>(
        ["recommendedUsers"],
        (users) => {
          const newUsers = users?.recommendedUsers.filter(
            ({ username }) => username !== followedUsername
          );

          return {
            recommendedUsers: newUsers!,
          };
        }
      );

      return prevUsers;
    },
    onSettled: () => {
      const users = queryClient.getQueryData<RecommendedUsersQuery>([
        "recommendedUsers",
      ]);

      if (users?.recommendedUsers.length === 0) {
        queryClient.invalidateQueries(["recommendedUsers"]);
      }
    },
  });

  return (
    <Box my={5} width={{ sm: 200, md: 250 }}>
      <Typography fontWeight="700" color={grey[800]} variant="h6">
        Suggested for you
      </Typography>
      <Stack direction="column">
        {data &&
          data.recommendedUsers.map((user) => (
            <Box key={user.username} display="flex" alignItems="center" mt={1}>
              <Link to={`/profile/${user.username}`}>
                <Avatar
                  src={user.image!}
                  alt={user.username}
                  sx={{ width: 35, height: 35, cursor: "pointer" }}
                />
              </Link>
              <Typography
                variant="h6"
                component={Link}
                to={`/profile/${user.username}`}
                color="primary"
                fontWeight={500}
                fontSize={"0.9em"}
                sx={{ ml: 1, textDecoration: "none" }}
              >
                {user.username}
              </Typography>
              <Box flexGrow={1} />
              <Button
                size="small"
                onClick={() => {
                  followUserMutate({ followedUsername: user.username });
                }}
              >
                Follow
              </Button>
            </Box>
          ))}
      </Stack>
    </Box>
  );
};

export default SuggestedProfile;
