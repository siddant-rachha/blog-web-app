import { Slide, ToastContainer } from 'react-toastify';

export const ToastNotify = () => {
  return (
    <ToastContainer
      style={{
        position: 'fixed',
        width: '80%',
        marginLeft: 'auto',
        marginTop: '4rem',
      }}
      position="top-right"
      autoClose={2000}
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
