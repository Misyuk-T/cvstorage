import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

// Suppress warning according to official docs:
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, pageProps }) => {
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
};

export default MyApp;
