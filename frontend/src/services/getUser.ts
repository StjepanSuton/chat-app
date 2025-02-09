import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getUser = async (): Promise<any> => {
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
