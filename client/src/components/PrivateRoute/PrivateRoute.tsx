import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Container, Divider } from "@mui/material";
import Navbar from "../Navbar/Navbar";

import { useAuth } from "../../hooks/useAuth";
import Login from "../../pages/Login/Login";
import Leftbar from "../Leftbar/Leftbar";
import Logo from "../Logo/Logo";

const PrivateRoute = () => {
  const [toggleOpen, setToggleOpen] = useState(false);

  const {
    auth: { user },
  } = useAuth();

  return (
    <React.Fragment>
      {user ? (
        <>
          <Navbar setToggleOpen={setToggleOpen} />
          <Outlet />
          <Drawer
            sx={{
              display: { md: "none" },
              position: "relative",
              px: "1.5rem",
            }}
            anchor="left"
            open={toggleOpen}
            onClose={() => setToggleOpen(false)}
          >
            <Container sx={{ paddingY: "1rem", width: "200px" }}>
              <Logo />
            </Container>
            <Divider />
            <Leftbar />
          </Drawer>
        </>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
