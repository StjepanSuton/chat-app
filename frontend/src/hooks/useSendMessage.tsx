import useConversation from "../zustand/useConversation";
import { useSendMessageMutation } from "src/services";

export const useSendMessage = () => {
  const { selectedConversation } = useConversation();

  const { mutateAsync: sendMessage, isPending: loading } =
    useSendMessageMutation(selectedConversation?.id);

  return { sendMessage, loading };
};
