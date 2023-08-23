import Sidebar from "@/components/Sidebar/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const env = process.env.BASE_URL;

  return (
    <Box color="black">
      {env} - base url
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    </Box>
  );
};

export default Home;
