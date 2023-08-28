import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

import Loader from "@/components/Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useKindeAuth();
  const router = useRouter();

  console.log(isAuthenticated, isLoading, " isAuthenticated, isLoading");

  useLayoutEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/api/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <div />;
};

export default ProtectedRoute;
