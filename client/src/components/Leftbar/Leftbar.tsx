import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineHome,
  MdOutlinePeopleAlt,
  MdOutlineList,
  MdOutlineCameraAlt,
  MdOutlineVideocam,
  MdOutlineAppSettingsAlt,
  MdOutlineShoppingBag,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import { removeUser } from "../../contexts/auth/auth.action";
import { useLogoutUserMutation } from "../../hooks/queryHooks";
import { useAuth } from "../../hooks/useAuth";
import { reqClient } from "../../queryClient";
import routes from "../../constants/routes.constant";

interface LeftbarProps {
  display?: "none";
}

const Leftbar = ({ display }: LeftbarProps) => {
  const { dispatch } = useAuth();
  const { mutate } = useLogoutUserMutation(reqClient, {
    onSuccess: () => {
      toast.success("Logout");
      dispatch(removeUser());
    },
  });

  const navigate = useNavigate();

  const items = [
    {
      name: "Home",
      Icon: MdOutlineHome,
      onClick: () => navigate(routes.HOME),
    },
    {
      name: "Friends",
      Icon: MdOutlinePeopleAlt,
    },
    {
      name: "Lists",
      Icon: MdOutlineList,
    },
    {
      name: "Camera",
      Icon: MdOutlineCameraAlt,
    },
    {
      name: "Videos",
      Icon: MdOutlineVideocam,
    },
    {
      name: "Apps",
      Icon: MdOutlineAppSettingsAlt,
    },
    {
      name: "Marketplace",
      Icon: MdOutlineShoppingBag,
    },
    {
      name: "Settings",
      Icon: MdOutlineSettings,
    },
    {
      name: "Logout",
      Icon: MdLogout,

      onClick: () => {
        mutate({});
      },
    },
  ];

  return (
    <Box flexGrow={1} display={{ xs: display, md: "block" }}>
      <List>
        {items.map(({ name, Icon, onClick }) => (
          <ListItem key={name} disableGutters>
            <ListItemButton onClick={onClick}>
              <ListItemIcon>
                <Icon size={25} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Leftbar;
