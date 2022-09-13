import { Box } from "@mui/material";
import Leftbar from "../../components/Leftbar/Leftbar";
import Newsfeed from "../../components/Newsfeed/Newsfeed";
import Rightbar from "../../components/Rightbar/Rightbar";

const Home = () => {
  return (
    <Box display="flex">
      <Leftbar display="none" />
      <Newsfeed />
      <Rightbar />
    </Box>
  );
};

export default Home;
