import { Slide, ToastContainer } from 'react-toastify';

export const ToastNotify = () => {
  return (
    <ToastContainer
      style={{
        position: 'fixed',
        width: '50%',
        marginLeft: 'auto',
        marginTop: '4rem',
      }}
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
};
