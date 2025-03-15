import { toast } from 'react-toastify';

export const useToast = () => {
  const successNotify = (message?: string) => {
    toast.success(message || 'Success');
  };

  const errorNotify = (message?: string) => {
    toast.error(message || 'Error');
  };

  const defaultNotify = (message: string) => {
    toast(message);
  };

  return { successNotify, errorNotify, defaultNotify };
};
