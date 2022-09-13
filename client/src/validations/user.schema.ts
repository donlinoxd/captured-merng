import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Min of 4 chars")
    .max(20, "Max of 20 chars"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address")
    .min(6, "Min of 6 chars")
    .max(25, "Max of 25 chars"),
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Min of 2 chars")
    .max(25, "Max of 25 chars"),
  password: yup
    .string()
    .min(8, "Min of 8 chars")
    .max(25, "Max of 25 chars")
    .required("Password is required")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain alpha numeric"),
  confirmPassword: yup
    .string()
    .min(8, "Min of 8 chars")
    .max(25, "Max of 25 chars")
    .required("Password is required")
    .oneOf([yup.ref("password")], "Password should match"),
});
