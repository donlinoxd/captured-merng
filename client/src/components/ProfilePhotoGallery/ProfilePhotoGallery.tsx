import { Box, Tabs, Tab, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PostsByUserQuery } from "../../hooks/queryHooks";

interface ProfilePhotoGalleryProps {
  data?: PostsByUserQuery;
}

const ProfilePhotoGallery = ({ data }: ProfilePhotoGalleryProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  const handleChangeTab = (e: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Box>
      <Tabs
        value={currentTab}
        centered
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: "1rem",
        }}
        onChange={handleChangeTab}
        aria-label="Photo Tabs"
      >
        <Tab label="CAPTURED" value={0} />
        <Tab label="TAGGED" value={1} />
      </Tabs>
      <Box>
        {data?.postsByUser && (
          <ImageList
            sx={{
              gap: { sm: "0.75rem !important", md: "1rem !important" },
              gridTemplateColumns: {
                sm: "repeat(3, 1fr) !important",
                md: "repeat(4, 1fr) !important",
              },
              paddingX: { xs: "0.5rem", sm: "10%" },
            }}
          >
            {data.postsByUser.map(
              ({ id, image }, index) =>
                index < 8 && (
                  <ImageListItem
                    key={id}
                    sx={{
                      width: "50%",
                      padding: "50%",
                      position: "relative",
                      background: "rgb(250,250,250)",
                    }}
                    onClick={() => navigate(`/posts/${id}`)}
                  >
                    <Image src={image} alt="Some Alt text" />
                  </ImageListItem>
                )
            )}
          </ImageList>
        )}
      </Box>
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

export default ProfilePhotoGallery;
