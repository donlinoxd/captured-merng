import { Skeleton, Stack, Paper, Box } from "@mui/material";

interface PostCardSkeletonProps {
  count?: number;
}

const PostCardSkeleton = ({ count = 1 }: PostCardSkeletonProps) => {
  return (
    <>
      {Array(count)
        .fill("")
        .map((_, index) => (
          <Paper key={index} sx={{ margin: "1rem 0", pb: "1rem" }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={2}
              sx={{ padding: "1rem" }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width="25%" />
            </Stack>
            <Box
              sx={{
                width: "50%",
                padding: "50%",
                position: "relative",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Stack direction="row" gap={1.5} sx={{ padding: "1rem" }}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
            </Stack>
            <Skeleton width="3rem" sx={{ fontSize: "1.8rem", ml: "1rem" }} />
            <Stack direction="row" gap={1} sx={{ marginX: "1rem" }}>
              <Skeleton sx={{ fontSize: "1.5rem" }} width="6rem" />
              <Skeleton sx={{ fontSize: "1.5rem" }} width="60%" />
            </Stack>
          </Paper>
        ))}
    </>
  );
};

export default PostCardSkeleton;
