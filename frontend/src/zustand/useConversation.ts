import { ConversationType } from "src/types";
import { create } from "zustand";

interface ConversationState {
  selectedConversation: ConversationType | null;
  setSelectedConversation: (conversation: ConversationType | null) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },
}));

export default useConversation;
