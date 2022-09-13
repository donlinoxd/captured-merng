import { Stack } from "@mui/material";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfilePhotoGallery from "../../components/ProfilePhotoGallery/ProfilePhotoGallery";
import { usePostsByUserQuery } from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();

  const { data } = usePostsByUserQuery(reqClient, { username: username! });

  return (
    <Stack spacing={4} paddingY={4}>
      <ProfileHeader postCount={data ? data.postsByUser.length : 0} />
      <ProfilePhotoGallery data={data} />
    </Stack>
  );
};
export default UserProfile;
