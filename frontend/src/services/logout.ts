import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

export const logOutUser = async (): Promise<string> => {
  try {
    const { data } = await axios.post("/api/auth/logout");
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const useLogout = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await logOutUser();
    },
    onSuccess: () => {
      queryClient.setQueriesData({ queryKey: ["authUser"] }, null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Message sending failed:", error);
    },
  });
};
