import * as React from "react";
import { toast } from "react-toastify";
import { MenuOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Badge,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  AppBar,
  Box,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  MdOutlineHome,
  MdMailOutline,
  MdOutlineNotifications,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

import { Search, SearchIconWrapper, StyledInputBase } from "./Navbar.styled";
import Logo from "../Logo/Logo";
import { useAuth } from "../../hooks/useAuth";
import routes from "../../constants/routes.constant";
import { useLogoutUserMutation } from "../../hooks/queryHooks";
import { reqClient } from "../../queryClient";
import { removeUser } from "../../contexts/auth/auth.action";

interface NavbarProps {
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setToggleOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const {
    auth: { user },
    dispatch,
  } = useAuth();

  const { mutate: logoutMutate } = useLogoutUserMutation(reqClient, {
    onSuccess: () => {
      toast.success("Logout");
      dispatch(removeUser());
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="transparent">
        <Container
          sx={{
            maxWidth: "lg",
            display: "flex",
            alignItems: "center",
            py: 1,
            bgcolor: "white",
          }}
        >
          <IconButton
            onClick={(e) => setToggleOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Logo display="none" />
          <Search>
            <SearchIconWrapper>
              <SearchOutlined />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <NavbarLinks />
          </Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <Avatar
              sx={{ width: "1.75rem", height: "1.75rem" }}
              aria-label={user?.username}
              src={user?.image!}
              alt={user?.username.toUpperCase()}
            ></Avatar>
          </IconButton>
        </Container>
        {!!anchorEl && (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={handleClose}
            >
              <NavbarLinks />
            </Box>
            <Divider sx={{ display: { xs: "flex", sm: "none" } }} />
            <MenuItem
              onClick={() => {
                navigate(`/profile/${user?.username}`);
                handleClose();
              }}
            >
              <ListItemIcon>
                <MdOutlineAccountCircle fontSize="1.2rem" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <MdOutlineSettings fontSize="1.2rem" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                logoutMutate({});
                handleClose();
              }}
            >
              <ListItemIcon>
                <MdOutlineLogout fontSize="1.2rem" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        )}
      </AppBar>
      <Box height={80} />
    </React.Fragment>
  );
};

const NavbarLinks = () => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
        component={Link}
        to={routes.HOME}
      >
        <Badge badgeContent={4} color="error">
          <MdOutlineHome />
        </Badge>
      </IconButton>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="error">
          <MdMailOutline />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <MdOutlineNotifications />
        </Badge>
      </IconButton>
    </>
  );
};

export default Navbar;
