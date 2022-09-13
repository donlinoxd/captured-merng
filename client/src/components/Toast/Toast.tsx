import { styled } from "@mui/material/styles";
import { ToastContainer, ToastContainerProps, Slide } from "react-toastify";

const ToastWrapper = styled(ToastContainer)<ToastContainerProps>({
  ".toast": {
    margin: "0 auto",
    background: "rgba(245,245,245)",
    width: "220px !important",
    color: "rgba(0,0,0)",
    minHeight: "auto",
    borderRadius: "3px",
    padding: "0.6rem",
  },
  'button[aria-label="close"]': {
    color: "rgba(0,0,0,0.8)",
  },
  ".body": {
    padding: 0,
    marginRight: "0.5rem",
    svg: {
      width: "90%",
      height: "90%",
    },
    fontSize: "0.9em",
  },
});

const Toast = () => {
  return (
    <ToastWrapper
      toastClassName="toast"
      bodyClassName="body"
      autoClose={3000}
      hideProgressBar={true}
      pauseOnFocusLoss={false}
      limit={1}
      position="top-center"
      transition={Slide}
    />
  );
};
export default Toast;
