import { useGetMessagesById } from "src/services";
import useConversation from "../zustand/useConversation";

export const useGetMessages = () => {
  const { selectedConversation } = useConversation();

  const { data, isLoading } = useGetMessagesById(selectedConversation?.id);
  return { messages: data, loading: isLoading };
};
