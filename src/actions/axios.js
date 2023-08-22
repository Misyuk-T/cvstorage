import axios from "axios";
import { toast } from "react-toastify";

import { Stack, Text } from "@chakra-ui/react";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
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
