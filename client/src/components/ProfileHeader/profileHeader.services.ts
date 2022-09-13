import { useState } from "react";
import {
  useUserQuery,
  useFollowUserMutation,
  UserQuery,
  useUpdateUserInfoMutation,
} from "../../hooks/queryHooks";
import { reqClient, queryClient } from "../../queryClient";
import { useParams } from "react-router-dom";
import { uploadImage } from "../PostForm/postform.service";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export const useProfileHeaderServices = () => {
  const { username } = useParams();
  const [uploading, setUploading] = useState(false);

  const {
    auth: { user },
  } = useAuth();

  const { data } = useUserQuery(reqClient, {
    username: username!,
  });

  const { mutate: followUserMutate } = useFollowUserMutation(reqClient, {
    onMutate: async () => {
      const queryKey = ["user", { username }];

      await queryClient.cancelQueries(queryKey);

      const prevUser = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<UserQuery>(queryKey, (userQuery) => {
        const newUserQuery = JSON.parse(JSON.stringify(userQuery)) as UserQuery;

        const userIndex = newUserQuery.user!.followers.findIndex(
          (username) => username === user?.username
        );

        if (userIndex === -1) {
          newUserQuery.user?.followers.push(user!.username);
        } else {
          newUserQuery.user?.followers.splice(userIndex, 1);
        }
        return newUserQuery;
      });
      return prevUser;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", { username }]);
    },
  });

  const { mutate: updateUserMutate } = useUpdateUserInfoMutation(reqClient, {
    onSettled: () => {
      setUploading(false);
      queryClient.invalidateQueries(["user", { username }]);
    },
    onSuccess: () => {
      toast.success("Profile updated");
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      const file = e.target.files[0];

      const result = await uploadImage(file, null);

      const imageUrl = result.data.url;

      updateUserMutate({
        image: imageUrl,
        username: username!,
      });
    }
  };

  return {
    data,
    followUserMutate,
    handleChange,
    uploading,
  };
};
