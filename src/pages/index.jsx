import { useState } from "react";
import { ChakraProvider, Heading, Text } from "@chakra-ui/react";

import theme from "src/styles/theme";

const Home = ({ users }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      console.log("User created successfully");
      // You can add a success message or redirect the user to another page here
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle the error here
    }
  };

  console.log(users);

  return (
    <ChakraProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Create User</button>

        <Text>Poppins</Text>
        <Heading>Prata</Heading>
      </form>
    </ChakraProvider>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/users`); // Use absolute URL
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}

export default Home;
