import React, { useEffect } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Scrollbar } from "react-scrollbars-custom";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

import { getAllTechnologies } from "@/actions/technologies";
import { getAllUsers } from "@/actions/user";
import { getAllProjects } from "@/actions/projects";

import useTechnologiesStore from "@/store/technologiesStore";
import useUsersStore from "@/store/usersStore";
import useProjectsStore from "@/store/projectsStore";

import theme from "@/styles/theme";

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
      <KindeProvider>
        <Scrollbar style={{ width: "100vw", height: "100vh" }}>
          <Container maxW={{ xl: "1280px" }} w="100%" p={0} centerContent>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              theme="light"
            />
          </Container>
        </Scrollbar>
      </KindeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
