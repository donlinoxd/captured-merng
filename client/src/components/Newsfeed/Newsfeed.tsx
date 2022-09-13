import { useRef, useCallback } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import PostCard from "../PostCard/PostCard";
import { useInfinitePostsQuery } from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";
import PostForm from "../PostForm/PostForm";
import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";
import { useAllPostServices } from "../../hooks/useAllPostServices";

const Newsfeed = () => {
  const allMutates = useAllPostServices(["posts.infinite"]);

  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage } =
    useInfinitePostsQuery("pageParam", reqClient, undefined, {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.posts.length
          ? { pageParam: allPages.length + 1 }
          : undefined;
      },
    });

  const intObserver = useRef<IntersectionObserver>();

  const lastPostRef = useCallback(
    (post: any) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <Box width={500} maxWidth="100%" sx={{ margin: "0 auto" }}>
      <PostForm />

      {data?.pages.map((page) =>
        page.posts.map((post, index) => {
          if (page.posts.length === index + 1) {
            return (
              <Container
                disableGutters
                sx={{ margin: "1rem 0", position: "relative" }}
                key={post.id}
                ref={lastPostRef}
              >
                <PostCard post={post} {...allMutates} />
              </Container>
            );
          } else {
            return (
              <Container
                disableGutters
                sx={{ margin: "1rem 0", position: "relative" }}
                key={post.id}
              >
                <PostCard post={post} {...allMutates} />
              </Container>
            );
          }
        })
      )}
      {isLoading && <PostCardSkeleton count={3} />}
      {isFetchingNextPage && (
        <Box sx={{ display: "grid", placeItems: "center" }}>
          <CircularProgress sx={{ margin: "0 auto" }} />
        </Box>
      )}
      {hasNextPage === false && (
        <Typography variant="body1" textAlign="center">
          No more posts for today. <a href="/#">Back to top</a>
        </Typography>
      )}
    </Box>
  );
};

export default Newsfeed;
