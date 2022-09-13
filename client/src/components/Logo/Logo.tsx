import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes.constant";

import { FaCameraRetro } from "react-icons/fa";

interface LogoProps {
  display?: "none" | "block";
}

const Logo = ({ display }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <Typography
      variant="h6"
      noWrap
      // TODO: component as Link
      component="div"
      sx={{
        display: { xs: display, md: "flex" },
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate(routes.HOME)}
    >
      <FaCameraRetro style={{ marginRight: "8px" }} />
      CAPTURED
    </Typography>
  );
};

export default Logo;
