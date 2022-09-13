import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.min.css";

import { Container } from "@mui/material";
import routes from "./constants/routes.constant";

import UserProfile from "./pages/UserProfile/UserProfile";
import Captured from "./pages/Captured/Captured";
import Toast from "./components/Toast/Toast";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
const PrivateRoute = React.lazy(
  () => import("./components/PrivateRoute/PrivateRoute")
);
const Home = React.lazy(() => import("./pages/Home/Home"));
const Register = React.lazy(() => import("./pages/Register/Register"));

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<LinearProgress color="primary" />}>
        <Container maxWidth="lg">
          <Routes>
            <Route path={routes.HOME} element={<PrivateRoute />}>
              <Route path={routes.HOME} element={<Home />} />
              <Route path={routes.USER_PROFILE} element={<UserProfile />} />
              <Route path={routes.CAPTURED} element={<Captured />} />
            </Route>
            <Route path={routes.REGISTER} element={<Register />} />
          </Routes>
        </Container>
      </React.Suspense>
      <ScrollToTop />
      <Toast />
    </Router>
  );
};

export default App;
