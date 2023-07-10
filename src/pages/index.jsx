import { ChakraProvider } from "@chakra-ui/react";

import theme from "src/styles/theme";

import UserForm from "@/components/Form/UserForm";

const Home = ({ users }) => {
  console.log(users, "users");

  return (
    <ChakraProvider theme={theme}>
      <UserForm />
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
