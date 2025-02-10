import { useGetConversations } from "src/services";
import { Conversation } from "./Conversation";
import { useSocketContext } from "src/context/SocketContext";

export const Conversations = () => {
  const { data: conversations, isLoading: loading } = useGetConversations();
  const { onlineUsers } = useSocketContext();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <p>Friends</p>
      {conversations &&
        conversations.map((conversation) => (
          <Conversation
            onlineUsers={onlineUsers}
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
