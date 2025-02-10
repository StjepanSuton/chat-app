import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "src/types";

export const getUser = async (): Promise<UserType> => {
  try {
    const { data } = await axios.get("/api/auth/me");
    return data;
  } catch (error: any) {
    console.error("Error fetching auth user:", error);
    throw error.response?.data?.error || "Failed to fetch user";
  }
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await getUser(),
    retry: false,
  });
};
