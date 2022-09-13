import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import PostCardSkeleton from "../../components/PostCardSkeleton/PostCardSkeleton";
import { usePostQuery } from "../../hooks/queryHooks";
import { useSinglePostServices } from "../../hooks/useSinglePostServices";
import { reqClient } from "../../queryClient";

const Captured = () => {
  const { postId } = useParams();

  const { data, isLoading } = usePostQuery(reqClient, {
    postId: postId!,
  });

  const allMutates = useSinglePostServices(["post", { postId }]);

  return (
    <Box margin="0 auto" width={{ xs: "95%", sm: "80%" }} maxWidth={500}>
      {isLoading && <PostCardSkeleton />}
      {data?.post && <PostCard post={data.post} {...allMutates} />}
    </Box>
  );
};

export default Captured;
