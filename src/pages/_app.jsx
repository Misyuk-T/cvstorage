import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { Scrollbar } from "react-scrollbars-custom";

import theme from "@/styles/theme";

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
    <ChakraProvider theme={theme}>
      <Scrollbar style={{ width: "100vw", height: "100vh" }}>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      </Scrollbar>
    </ChakraProvider>
  );
};

export default MyApp;
