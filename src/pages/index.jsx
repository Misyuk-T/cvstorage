import { ChakraProvider } from "@chakra-ui/react";

import theme from "src/styles/theme";

import UserForm from "@/components/UserForm/UserForm";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import TechnologyForm from "@/components/TechnologyForm/TechnologyForm";

const Home = ({ users }) => {
  console.log(users, "users");

  return (
    <ChakraProvider theme={theme}>
      <UserForm />
      ___________________
      <ProjectForm />
      ___________________
      <TechnologyForm />
    </ChakraProvider>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/user`); // Use absolute URL
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}

export default Home;
