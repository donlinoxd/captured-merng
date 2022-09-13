import { createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
const theme = createTheme({
  palette: {
    primary: {
      light: grey[100],
      main: grey[900],
      contrastText: grey[100],
    },
    secondary: {
      main: "#3366cc",
    },
  },
});

export default theme;
