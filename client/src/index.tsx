import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

// local modules
import App from "./App";
import theme from "./theme";
import AuthProvider from "./contexts/auth/AuthProvider";
import { queryClient } from "./queryClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);
