import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Scrollbar } from "react-scrollbars-custom";

import theme from "@/styles/theme";
import { getAllTechnologies } from "@/actions/technologies";
import { getAllUsers } from "@/actions/user";
import { getAllProjects } from "@/actions/projects";
import useTechnologiesStore from "@/store/technologiesStore";
import useUsersStore from "@/store/usersStore";
import useProjectsStore from "@/store/projectsStore";

// Suppress warning according to official docs:
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, pageProps }) => {
  const { setTechnologies } = useTechnologiesStore();
  const { setUsers } = useUsersStore();
  const { setProjects } = useProjectsStore();

  const fetchData = async () => {
    try {
      const technologiesData = await getAllTechnologies();
      const usersData = await getAllUsers();
      const projectsData = await getAllProjects();

      setTechnologies(technologiesData);
      setUsers(usersData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
