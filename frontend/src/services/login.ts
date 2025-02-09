import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const { data } = await axios.post("/api/auth/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => await loginUser(username, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
    },

    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });
};
