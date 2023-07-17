import { extendTheme } from "@chakra-ui/react";

import "@fontsource/poppins/latin.css";
import "@fontsource/prata/latin.css";

import "react-toastify/dist/ReactToastify.css";

const theme = extendTheme({
  fonts: {
    heading: "Prata",
  },
  styles: {
    global: {
      html: {
        body: {
          fontFamily: "Poppins",
        },
      },
    },
  },
});

export default theme;
