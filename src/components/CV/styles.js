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

Font.registerHyphenationCallback((word) => [word]);

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    height: "auto",
    fontFamily: "Poppins",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
    height: 90,
    width: "100%",
    backgroundColor: "#00786e",
    padding: "0 35px",
    marginBottom: 10,
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
  image: {
    width: "auto",
    height: 50,
  },

  textSmall: {
    fontSize: 10,
    fontWeight: 400,
    color: "black",
  },
  textBold: {
    fontSize: 10,
    fontWeight: 600,
    color: "black",
  },
  textTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 600,
    color: "white",
  },

  skillsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 5,
    margin: "0 -10px",
    marginTop: 5,
  },
  skillsItem: {},
  skill: {
    position: "relative",
    fontSize: 10,
    color: "black",
    opacity: 0.6,
  },
  skillsList: {
    display: "flex",
    gap: 5,
    padding: "10px 17px",
    borderRadius: 10,
    backgroundColor: "#f5f9fd",
  },
  skillsTitleBox: {
    padding: "0 8px",
    backgroundColor: "#ffdf33",
    alignSelf: "center",
    marginBottom: 8,
  },
  skillsTitle: {
    fontSize: 13,
    textTransform: "uppercase",
    color: "black",
    fontWeight: 600,
  },

  footer: {},
  footerText: {
    fontSize: 10,
    color: "black",
    opacity: 0.6,
  },

  projectBox: {
    display: "flex",
    flexDirection: "row",
    margin: "0 -15px 5px",
  },
  projectTitleBox: {
    position: "relative",
    right: -10,
    padding: "1px 10px",
    minWidth: 130,
    backgroundColor: "#ffdf33",
    alignSelf: "flex-start",
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: "black",
    textAlign: "left",
  },
  projectList: {},
});
