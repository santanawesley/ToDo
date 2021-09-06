import { toast } from 'react-toastify';

/**
 *
 * @param type The type of toast
 * @param message The message of toast
 * @example showToast('error', 'Aconteceu um erro!');
 */

const showToast = (
  type,
  message
) => {
  if (type === 'info') {
    toast.info(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };

  if (type === 'error') {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };

  if (type === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };
};

export default showToast;