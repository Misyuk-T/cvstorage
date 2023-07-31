import { extendTheme } from "@chakra-ui/react";

import "@fontsource/poppins/latin.css";
import "@fontsource/roboto-slab";
import "@fontsource/roboto-mono";
import "@fontsource/share-tech-mono";
import "@fontsource/prata/latin.css";

import "react-toastify/dist/ReactToastify.css";

const theme = extendTheme({
  fonts: {
    heading: "Roboto Slab",
  },
  styles: {
    global: {
      html: {
        body: {
          fontFamily: "Poppins",
        },

        ".rcs-inner-handle": {
          backgroundColor: "gray.400 !important",
        },
      },
    },
  },
});

export default theme;
