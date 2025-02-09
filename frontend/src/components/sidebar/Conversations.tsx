import { useGetConversations } from "src/services";
import { Conversation } from "./Conversation";
import { useSocketContext } from "src/context/SocketContext";

const Conversations = () => {
  const { data: conversations, isLoading: loading } = useGetConversations();
  const { onlineUsers } = useSocketContext();
  //useSubscribeToNotifications();
  return (
    <div className="py-2 flex flex-col overflow-auto">
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
export default Conversations;
