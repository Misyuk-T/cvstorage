import axios from "axios";
import { toast } from "react-toastify";

import { Stack, Text } from "@chakra-ui/react";

const BASE_URL = process.env.BASE_URL;
const CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${CLIENT_SECRET}`,
    Accept: "application/json",
  },
});

instance.interceptors.response.use(null, (error) => {
  const errorText = error.message;
  const statusRequest = error.response.status;

  if (errorText) {
    toast.error(
      <Stack>
        <Text fontWeight={600}>Status: {statusRequest}</Text>
        <Text>{errorText}</Text>
      </Stack>,
      {},
    );
  }

  return Promise.reject(error);
});
