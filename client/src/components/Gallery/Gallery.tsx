import { Box, Typography, ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { usePostsByUserQuery } from "../../hooks/queryHooks";
import { useAuth } from "../../hooks/useAuth";
import { reqClient } from "../../queryClient";

const Gallery = () => {
  const {
    auth: { user },
  } = useAuth();

  const navigate = useNavigate();

  const { data } = usePostsByUserQuery(reqClient, { username: user!.username });

  return (
    <Box sx={{ width: { sm: 200, md: 300 } }}>
      <Typography fontWeight="700" color={grey[800]} variant="h6">
        Gallery
      </Typography>
      {data && (
        <ImageList cols={2}>
          {data?.postsByUser?.map((post) => (
            <ImageListItem
              key={post.id}
              sx={{
                width: "50%",
                padding: "50%",
                position: "relative",
                background: "rgb(250,250,250)",
              }}
              onClick={() => navigate(`/posts/${post.id}`)}
              cols={1}
              rows={1}
            >
              <Image src={post.image} alt="Some Alt text" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

const Image = styled("img")({
  objectFit: "contain",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: "2px",
});

export default Gallery;
