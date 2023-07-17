import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const error = pageProps?.error;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </>
  );
}

export default MyApp;
