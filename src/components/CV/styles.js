import { StyleSheet, Font } from "@react-pdf/renderer";

import TechMono from "@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff";
import Poppins300 from "@fontsource/poppins/files/poppins-latin-300-normal.woff";
import Poppins400 from "@fontsource/poppins/files/poppins-latin-400-normal.woff";
import Poppins500 from "@fontsource/poppins/files/poppins-latin-500-normal.woff";
import Poppins600 from "@fontsource/poppins/files/poppins-latin-600-normal.woff";
import Poppins800 from "@fontsource/poppins/files/poppins-latin-800-normal.woff";
import RobotoSlab300 from "@fontsource/roboto-slab/files/roboto-slab-latin-300-normal.woff";
import RobotoSlab400 from "@fontsource/roboto-slab/files/roboto-slab-latin-400-normal.woff";
import RobotoSlab500 from "@fontsource/roboto-slab/files/roboto-slab-latin-500-normal.woff";
import RobotoSlab600 from "@fontsource/roboto-slab/files/roboto-slab-latin-600-normal.woff";
import RobotoSlab800 from "@fontsource/roboto-slab/files/roboto-slab-latin-800-normal.woff";
import Roboto300 from "@fontsource/roboto/files/roboto-latin-300-normal.woff";
import Roboto400 from "@fontsource/roboto/files/roboto-latin-400-normal.woff";
import Roboto500 from "@fontsource/roboto/files/roboto-latin-500-normal.woff";
import Roboto700 from "@fontsource/roboto/files/roboto-latin-700-normal.woff";

Font.register({
  family: "Share Tech Mono",
  fonts: [
    {
      src: TechMono,
      fontWeight: 400,
    },
  ],
});

Font.register({
  family: "Poppins",
  fonts: [
    { src: Poppins300, fontWeight: 300 },
    { src: Poppins400, fontWeight: 400 },
    { src: Poppins500, fontWeight: 500 },
    { src: Poppins600, fontWeight: 600 },
    { src: Poppins800, fontWeight: 800 },
  ],
});

Font.register({
  family: "Roboto Slab",
  fonts: [
    { src: RobotoSlab300, fontWeight: 300 },
    { src: RobotoSlab400, fontWeight: 400 },
    { src: RobotoSlab500, fontWeight: 500 },
    { src: RobotoSlab600, fontWeight: 600 },
    { src: RobotoSlab800, fontWeight: 800 },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    { src: Roboto300, fontWeight: 300 },
    { src: Roboto400, fontWeight: 400 },
    { src: Roboto500, fontWeight: 500 },
    { src: Roboto700, fontWeight: 700 },
  ],
});

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ededed",
    padding: 10,
    width: "100%",
    height: "auto",
    fontFamily: "Roboto",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
    height: 80,
    width: "100%",
    backgroundColor: "#03a497",
    padding: "0 15px",
    marginBottom: 10,
  },
  firstItem: {
    display: "flex",
    alignSelf: "stretch",
    width: "40%",
    backgroundColor: "#091543",
    marginTop: -11,
    height: 723,
    padding: 10,
  },
  secondItem: {
    display: "flex",
    width: "60%",
    height: 700,
  },

  flex: {
    display: "flex",
    flexDirection: "row",
  },

  stack: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  imageContainer: {
    position: "relative",
    display: "block",
    width: 110,
    height: 110,
    borderRadius: "50%",
    backgroundColor: "white",
  },
  image: {
    position: "relative",
    left: 5,
    top: 5,
    width: 100,
    height: 100,
    borderRadius: "50%",
  },

  textSmall: {
    fontSize: 10,
    fontWeight: 400,
    color: "black",
  },
  textBold: {
    fontSize: 10,
    fontWeight: 800,
    color: "black",
  },
  textTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 600,
    color: "white",
  },

  firstDivider: {
    display: "block",
    width: "100%",
    height: 2,
    backgroundColor: "#ededed",
    margin: "15px 0",
    borderRadius: 5,
  },
  extraLine: {
    display: "block",
    width: "100%",
    height: 1,
    backgroundColor: "#091543",
    marginBottom: 3,
    marginLeft: 15,
    borderRadius: 5,
  },
});
