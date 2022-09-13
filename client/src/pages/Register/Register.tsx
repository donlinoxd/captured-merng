import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { grey } from "@mui/material/colors";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaCameraRetro } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import routes from "../../constants/routes.constant";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema } from "../../validations/user.schema";
import {
  RegisterUserInput,
  useRegisterUserMutation,
} from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";

const data: { name: keyof RegisterUserInput; label: string; type: string }[] = [
  { name: "username", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "name", label: "Name", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "confirmPassword", type: "password" },
];

const Register = () => {
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useAuth();

  const { mutate, error, isLoading } = useRegisterUserMutation(reqClient, {
    onSuccess: (data) => {
      if (data) {
        toast.success("Registered");
        navigate(routes.HOME);
      }
    },
  });

  const { handleSubmit, control } = useForm<RegisterUserInput>({
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    delayError: 500,
  });

  const registerUserHandler: SubmitHandler<RegisterUserInput> = (data) => {
    mutate(data);
  };

  if (user) {
    return <Navigate to={routes.HOME} />;
  }

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
        onSubmit={handleSubmit(registerUserHandler)}
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
          CREATE AN ACCOUNT.
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
              {error.message.includes("E11000")
                ? "Username or email already exists"
                : error.message.split(":")[0]}
            </Typography>
          )}
          {data.map(({ name, label, type }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field, formState: { errors } }) => (
                <Box sx={{ position: "relative" }}>
                  <TextField
                    error={!!errors[name]}
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
                  {errors[name] && (
                    <Typography
                      variant="body1"
                      color="error"
                      fontSize="0.9em"
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 0,
                      }}
                    >
                      {errors[name]?.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          ))}
        </Box>
        <LoadingButton
          loading={isLoading}
          loadingPosition="center"
          type="submit"
          size="medium"
          sx={{
            backgroundColor: "primary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
        >
          Register
        </LoadingButton>
        <Divider sx={{ my: 3 }} />
        <Typography align="center" variant="subtitle1">
          Already have an account?{" "}
          <Typography
            variant="button"
            sx={{
              textDecoration: "none",
              color: "secondary",
            }}
            component={Link}
            to={routes.HOME}
          >
            Login
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
