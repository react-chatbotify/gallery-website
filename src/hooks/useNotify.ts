import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

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
  const notify = (text: string) =>
    toast(text, {
      autoClose: 3000,
      closeOnClick: true,
      draggable: false,
      hideProgressBar: true,
      pauseOnHover: false,
      position: 'bottom-center',
      style: { justifyContent: 'center' },
      theme: theme.palette.mode,
    });

  return notify;
};

export { useNotify };
