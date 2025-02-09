import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useConversation from "src/zustand/useConversation";
import { useSocketContext } from "src/context/SocketContext";
import { useMarkConversationSeen } from "src/services";
import { MessageType } from "src/types";

export const useSubscribeToChat = () => {
  const { selectedConversation } = useConversation();
  const queryClient = useQueryClient();
  const { mutateAsync: markConversationSeen } = useMarkConversationSeen();
  const { socket } = useSocketContext();
  const [newMessageReceived, setNewMessageReceived] =
    React.useState<MessageType | null>(null);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageReceived(newMessage);
      newMessage.shouldShake = true;
      queryClient.setQueryData(
        ["messages", selectedConversation?.id],
        (oldMessages: any[]) => {
          return oldMessages ? [...oldMessages, newMessage] : [newMessage];
        }
      );
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);

  React.useEffect(() => {
    if (newMessageReceived) {
      if (newMessageReceived.senderId === selectedConversation?.id) {
        markConversationSeen({
          conversationId: selectedConversation?.id,
        });
      }
    }
  }, [newMessageReceived]);
};
