import { red, grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Avatar,
  IconButton,
  Button,
  CardContent,
  Typography,
  Stack,
  InputBase,
} from "@mui/material";
import {
  FaRegCommentDots,
  FaRegHeart,
  FaHeart,
  FaRegShareSquare,
  FaRegPaperPlane,
  FaRegTrashAlt,
} from "react-icons/fa";
import {
  AddCommentMutation,
  DeletePostMutation,
  LikePostMutation,
  DeleteCommentMutation,
  Exact,
  PostsQuery,
} from "../../hooks/queryHooks";

import { useAuth } from "../../hooks/useAuth";
import { UseMutateFunction } from "@tanstack/react-query";

interface PostCardProps {
  post: PostsQuery["posts"]["0"];
  addCommentMutate: UseMutateFunction<
    AddCommentMutation,
    Error,
    Exact<{
      body: string;
      postId: string;
    }>,
    unknown
  >;
  deletePostMutate: UseMutateFunction<
    DeletePostMutation,
    Error,
    Exact<{
      postId: string;
    }>,
    any
  >;
  likePostMutate: UseMutateFunction<
    LikePostMutation,
    Error,
    Exact<{
      postId: string;
    }>,
    unknown
  >;
  deleteCommentMutate: UseMutateFunction<
    DeleteCommentMutation,
    Error,
    Exact<{
      commentId: string;
    }>,
    unknown
  >;
}

const PostCard = ({
  post,
  likePostMutate,
  deletePostMutate,
  addCommentMutate,
  deleteCommentMutate,
}: PostCardProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const {
    auth: { user },
  } = useAuth();
  const navigate = useNavigate();

  const {
    caption,
    id,
    image,
    createdAt,
    username,
    comments,
    isLiked,
    likeCount,
  } = post;

  const commentRef = useRef<HTMLButtonElement>(null!);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            component={Link}
            to={`/profile/${username}`}
            sx={{ bgcolor: red[500] }}
            aria-label={username}
            src="/"
            alt={username.toUpperCase()}
          ></Avatar>
        }
        title={
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component={Link}
            to={`/profile/${username}`}
            color="primary"
            sx={{ textDecoration: "none" }}
          >
            {username}
          </Typography>
        }
        action={
          <Box sx={{ position: "relative" }}>
            <IconButton
              aria-label="settings"
              sx={{ position: "relative" }}
              onClick={() => setShowDelete(!showDelete)}
            >
              <MoreVertIcon />
            </IconButton>
            <Button
              onClick={() => deletePostMutate({ postId: id })}
              disabled={user?.username !== username}
              sx={{
                position: "absolute",
                top: 2,
                right: 36,
                display: showDelete ? "flex" : "none",
                gap: "0.35rem",
                border: "1px solid rgba(0,0,0,0.25)",
              }}
            >
              Delete <FaRegTrashAlt />
            </Button>
          </Box>
        }
        sx={{ span: { fontWeight: "bold" } }}
      />
      <Box
        sx={{
          position: "relative",
          width: "50%",
          padding: "50%",
          background: "rgba(250,250,250)",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={image}
          alt={caption}
          sx={{ position: "absolute", top: 0, left: 0, objectFit: "contain" }}
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton
          aria-label="heart"
          onClick={() =>
            likePostMutate({
              postId: id,
            })
          }
        >
          {isLiked ? (
            <FaHeart cursor="pointer" color="red" />
          ) : (
            <FaRegHeart cursor="pointer" />
          )}
        </IconButton>
        <IconButton
          aria-label="comment"
          onClick={() => {
            commentRef.current.focus();
          }}
        >
          <FaRegCommentDots cursor="pointer" />
        </IconButton>
        <IconButton aria-label="share">
          <FaRegShareSquare cursor="pointer" />
        </IconButton>
      </CardActions>
      <CardContent sx={{ py: 0, position: "relative" }}>
        <Typography variant="subtitle1" fontWeight={800}>
          {likeCount > 0 ? `${likeCount} likes` : null}
        </Typography>
        <Stack direction="row" my="4px">
          <Typography variant="subtitle2" fontWeight={800} mr={1}>
            {username}
          </Typography>
          <Typography variant="body1" fontSize="0.9em">
            {caption}
          </Typography>
        </Stack>
        {comments
          ?.slice()
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          .map((comment) => (
            <Stack
              key={comment.id}
              direction="row"
              my="4px"
              sx={{
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  background: "rgb(250,250,250)",
                  borderRadius: 3,
                  ".comment-delete": {
                    display:
                      comment.username === user?.username ? "block" : "none",
                  },
                },
              }}
            >
              <Typography variant="subtitle2" fontWeight={800} mr={1}>
                {comment.username}
              </Typography>
              <Typography
                variant="body1"
                fontSize="0.9em"
                sx={{ width: "77%", wordBreak: "break-word" }}
              >
                {comment.body}
              </Typography>
              <IconButton
                onClick={() => deleteCommentMutate({ commentId: comment.id })}
                className="comment-delete"
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  display: "none",
                }}
              >
                <FaRegTrashAlt />
              </IconButton>
            </Stack>
          ))}

        {comments && comments.length > 4 && (
          <Typography
            variant="subtitle2"
            fontWeight={800}
            textAlign="center"
            mt={1}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => navigate(`/posts/${id}`)}
          >
            View all comments...
          </Typography>
        )}

        <Stack
          direction="row"
          mt={3}
          component="form"
          onSubmit={(e) => {
            setCommentBody("");
            e.preventDefault();
            addCommentMutate({ body: commentBody, postId: id });
          }}
        >
          <InputBase
            inputRef={commentRef}
            placeholder="Add a comment ..."
            fullWidth
            type="text"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            sx={{
              border: `1px solid ${grey[200]}`,
              px: 2,
              borderRadius: 1,
              fontSize: "0.9em",
            }}
          />
          <IconButton type="submit" disabled={!commentBody.length}>
            <FaRegPaperPlane />
          </IconButton>
        </Stack>
      </CardContent>
      <Typography variant="subtitle2" fontWeight={500} sx={{ m: "1rem" }}>
        {moment(new Date(createdAt)).fromNow()}
      </Typography>
    </Card>
  );
};

export default PostCard;
