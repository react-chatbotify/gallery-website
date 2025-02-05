import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

/**
 * Notifies user by displaying information via a toast.
 */
const useNotify = () => {
  const theme = useTheme();
  
  /**
   * Notifies user with information.
   *
   * @param text text containing information to show
   */
  const notify = (text: string) => toast(text, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: theme.palette.mode,
    style: {justifyContent: "center"}
  });

  return notify;
};

export { useNotify };
