import Sidebar from "@/components/Sidebar/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { Box, Stack, Text } from "@chakra-ui/react";

const Home = () => {
  const env = process.env.BASE_URL;
  const KINDE_CLIENT_ID = process.env.KINDE_CLIENT_ID;
  const KINDE_CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET;
  const KINDE_ISSUER_URL = process.env.KINDE_ISSUER_URL;
  const KINDE_SITE_URL = process.env.KINDE_SITE_URL;
  const KINDE_POST_LOGOUT_REDIRECT_URL =
    process.env.KINDE_POST_LOGOUT_REDIRECT_URL;
  const KINDE_POST_LOGIN_REDIRECT_URL =
    process.env.KINDE_POST_LOGIN_REDIRECT_URL;

  return (
    <Box color="black">
      <Stack>
        <Text> {env} - base url </Text>
        <Text>{KINDE_CLIENT_ID} - KINDE_CLIENT_ID </Text>
        <Text> {KINDE_CLIENT_SECRET} - KINDE_CLIENT_SECRET </Text>
        <Text> {KINDE_ISSUER_URL} - KINDE_ISSUER_URL </Text>
        <Text>{KINDE_SITE_URL} - KINDE_SITE_URL </Text>
        <Text>
          {KINDE_POST_LOGOUT_REDIRECT_URL} - KINDE_POST_LOGOUT_REDIRECT_URL{" "}
        </Text>
        <Text>
          {KINDE_POST_LOGIN_REDIRECT_URL} - KINDE_POST_LOGIN_REDIRECT_URL{" "}
        </Text>
      </Stack>

      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    </Box>
  );
};

export default Home;
