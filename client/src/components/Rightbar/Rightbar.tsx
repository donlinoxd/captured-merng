import { Box } from "@mui/material";
import Gallery from "../Gallery/Gallery";
import OnlineFriends from "../OnlineFriends/OnlineFriends";
import SuggestedProfile from "../SuggestedProfile/SuggestedProfile";
const Rightbar = () => {
  return (
    <Box flexGrow={1} display={{ xs: "none", sm: "block" }} ml={4}>
      <OnlineFriends />
      <SuggestedProfile />
      <Gallery />
    </Box>
  );
};

export default Rightbar;
