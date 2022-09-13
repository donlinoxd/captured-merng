import {
  IconButton,
  Paper,
  OutlinedInput,
  Box,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect, ChangeEvent } from "react";
import { PhotoCamera } from "@mui/icons-material";
import { uploadImage } from "./postform.service";
import { useCreatePostMutation } from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";
import { useQueryClient } from "@tanstack/react-query";

const PostForm = () => {
  const queryClient = useQueryClient();

  const { mutate } = useCreatePostMutation(reqClient, {
    onError: (_, __, context: any) => {
      toast.error("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts.infinite"]);
    },
    onSuccess: () => {
      toast.success("Posted");
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <Paper
      component="form"
      encType="multipart/form-data"
      onSubmit={async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
          const result = await uploadImage(selectedFile, preview);
          mutate({ caption, image: result.data.url });
          setIsLoading(false);
          setCaption("");
          setSelectedFile(null);
          setPreview("");
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.7rem",
        padding: "0.6rem 0.2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "0 0.2rem ",
          width: "100%",
        }}
      >
        <OutlinedInput
          placeholder="Share something beautiful?"
          size="small"
          aria-placeholder="post caption"
          value={caption}
          multiline
          maxRows={3}
          onChange={(e) => setCaption(e.target.value)}
          sx={{
            width: "60%",
          }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" onChange={onSelectFile} />
          <PhotoCamera fontSize="large" />
        </IconButton>
      </Box>
      {selectedFile && preview && (
        <Container
          sx={{
            width: "40%",
            padding: "40% !important",
            position: "relative",
          }}
        >
          <Image src={preview} alt={caption} />
        </Container>
      )}
      <LoadingButton
        loading={isLoading}
        loadingPosition="center"
        variant="contained"
        type="submit"
      >
        Post
      </LoadingButton>
    </Paper>
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
});

export default PostForm;
