import { ChakraProvider } from "@chakra-ui/react";

import theme from "src/styles/theme";

import { getAllTechnologies } from "@/actions/technologies";
import { getAllUsers } from "@/actions/user";
import { getAllProjects } from "@/actions/projects";

import Sidebar from "@/components/Sidebar/Sidebar";

const Home = ({ technologies, users, projects }) => {
  console.log("Technologies:", technologies);
  console.log("Users:", users);
  console.log("Projects:", projects);

  return (
    <ChakraProvider theme={theme}>
      <Sidebar technologies={technologies} users={users} projects={projects} />
    </ChakraProvider>
  );
};

export async function getServerSideProps() {
  try {
    const technologies = await getAllTechnologies();
    const users = await getAllUsers();
    const projects = await getAllProjects();
    return { props: { technologies, users, projects } };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        error: error.message,
        technologies: [],
        users: [],
        projects: [],
      },
    };
  }
}

export default Home;
