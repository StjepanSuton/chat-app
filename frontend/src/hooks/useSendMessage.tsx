import { useSendMessageMutation } from "src/services";
import { useConversation } from "src/zustand";

export const useSendMessage = () => {
  const { selectedConversation } = useConversation();

  const { mutateAsync: sendMessage, isPending: loading } =
    useSendMessageMutation(selectedConversation?.id);

  return { sendMessage, loading };
};
