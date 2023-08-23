import Sidebar from "@/components/Sidebar/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Home = () => {
  return (
    <ProtectedRoute>
      <Sidebar />
    </ProtectedRoute>
  );
};

export default Home;
