import {
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { grey } from "@mui/material/colors";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaCameraRetro } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setUser } from "../../contexts/auth/auth.action";
import { useAuth } from "../../hooks/useAuth";
import routes from "../../constants/routes.constant";
import {
  useLoginUserMutation,
  MutationLoginUserArgs,
} from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";

const data: {
  name: keyof MutationLoginUserArgs;
  label: string;
  type: string;
}[] = [
  { name: "username", label: "Username", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

const Login = () => {
  const { mutate, error, isLoading } = useLoginUserMutation(reqClient, {
    onSuccess: (data) => {
      toast.success("Login");
      data && dispatch(setUser(data.loginUser));
    },
  });

  const { dispatch } = useAuth();

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<MutationLoginUserArgs>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    delayError: 500,
  });

  const registerUser: SubmitHandler<MutationLoginUserArgs> = (data) => {
    const { username, password } = data;
    mutate({ username, password: password! });
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.02)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingX: 4,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: "relative",
          display: { xs: "none", sm: "flex" },
          mr: 8,
        }}
      >
        <FaCameraRetro size={45} />
        <Typography
          variant="h3"
          fontWeight={600}
          ml={1}
          fontFamily="Century Gothic"
        >
          CAPTURED
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ position: "absolute", top: -16, right: 0 }}
          component="span"
          fontWeight={400}
        >
          a moment
        </Typography>
      </Stack>
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(registerUser)}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: 2, sm: 4 },
          borderRadius: 1,
          width: "90%",
          maxWidth: 375,
        }}
      >
        <Typography variant="h6" fontWeight={600} align="center" mb={4}>
          LOG IN.
        </Typography>
        <Box sx={{ position: "relative" }}>
          {error && (
            <Typography
              variant="body1"
              color="error"
              sx={{
                position: "absolute",
                right: 0,
                top: "-1.5rem",
              }}
            >
              {error.message.split(":")[0]}
            </Typography>
          )}
          {data.map(({ name, label, type }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  variant="outlined"
                  size="small"
                  {...field}
                  label={label}
                  sx={{
                    mb: 3,
                    background: grey[100],
                  }}
                  type={type}
                  fullWidth
                />
              )}
            />
          ))}
        </Box>

        {
          // TODO: Change to LoadingButton components from @mui/labs
        }

        <LoadingButton
          loading={isLoading}
          loadingPosition="center"
          type="submit"
          size="medium"
          disabled={!isValid}
          variant="contained"
        >
          SIGN IN
        </LoadingButton>
        <Divider sx={{ my: 3 }} />
        <Typography align="center" variant="subtitle1">
          Don't have an account'?{" "}
          <Typography
            variant="button"
            sx={{
              textDecoration: "none",
              color: "secondary",
            }}
            component={Link}
            to={routes.REGISTER}
          >
            Register
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
