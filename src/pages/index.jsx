import { ChakraProvider } from "@chakra-ui/react";

import Link from "next/link";

import UserForm from "@/components/UserForm/UserForm";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import TechnologyForm from "@/components/TechnologyForm/TechnologyForm";

import theme from "src/styles/theme";

const Home = () => {
  return (
    <ChakraProvider theme={theme}>
      <Link href="/technologies">technologies</Link>
      <Link href="/users">users</Link>
      <Link href="/projects">projects</Link>
      <UserForm />
      ___________________
      <ProjectForm />
      ___________________
      <TechnologyForm />
    </ChakraProvider>
  );
};

export default Home;
