import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ConversationType } from "src/types";

export const getConversations = async (): Promise<ConversationType[]> => {
  try {
    const { data } = await axios.get("/api/messages/conversations");
    return data;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    throw error.response?.data?.error || "Failed to fetch conversations";
  }
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => await getConversations(),
  });
};
