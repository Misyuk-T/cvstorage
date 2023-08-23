import { Box } from "@chakra-ui/react";

import Sidebar from "@/components/Sidebar/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Home = () => {
  return (
    <Box color="black">
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    </Box>
  );
};

export default Home;
