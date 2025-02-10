import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "src/types";

export const getMessagesData = async (
  conversationId?: string | null
): Promise<Message[]> => {
  try {
    const { data } = await axios.get(`/api/messages/${conversationId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetMessagesById = (conversationId?: string | null) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => await getMessagesData(conversationId),
    enabled: Boolean(conversationId),
  });
};

export const useSendMessageMutation = (conversationId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageData: string) => {
      if (!conversationId) throw new Error("No conversation selected");
      const { data } = await axios.post(
        `/api/messages/send/${conversationId}`,
        { message: JSON.stringify(messageData) }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });
    },
    onError: (error) => {
      console.error("Message sending failed:", error);
    },
  });
};
